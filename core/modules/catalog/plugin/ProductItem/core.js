/* eslint-disable jsx-a11y/anchor-is-valid */
import { modules, debuging } from '@config';
import { getLoginInfo } from '@helper_auth';
import { setCookies } from '@helper_cookies';
import { useTranslation } from '@i18n';
import route from 'next/router';
import React from 'react';
import { setResolver, getResolver } from '@helper_localstorage';
import classNames from 'classnames';
import ConfigurableOpt from '@core_modules/product/plugin/OptionItem';
import dynamic from 'next/dynamic';
import { addWishlist, getDetailProduct } from '../../services/graphql';
import useStyles from './style';

const ModalQuickView = dynamic(() => import('./components/QuickView'), { ssr: false });

const ProductItem = (props) => {
    const {
        id, url_key = '', categorySelect, review, ImageProductView, DetailProductView, LabelView, className = '',
        enableAddToCart, enableOption, enableQuickView, isGrid, catalogList, ...other
    } = props;
    const styles = useStyles();
    const { t } = useTranslation(['catalog', 'common']);
    const [feed, setFeed] = React.useState(false);
    const [spesificProduct, setSpesificProduct] = React.useState({});
    const [openQuickView, setOpenQuickView] = React.useState(false);

    let isLogin = '';
    if (typeof window !== 'undefined') isLogin = getLoginInfo();
    const [getProduct, detailProduct] = getDetailProduct();
    const [postAddWishlist] = addWishlist();

    const handleFeed = () => {
        if (isLogin && isLogin !== '') {
            postAddWishlist({
                variables: {
                    productId: id,
                },
            })
                .then(async () => {
                    await setFeed(!feed);
                    await window.toastMessage({ open: true, variant: 'success', text: t('common:message:feedSuccess') });
                    route.push('/wishlist');
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:message:feedFailed'),
                    });
                });
        } else if (typeof window.toastMessage !== 'undefined') {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('catalog:wishlist:addWithoutLogin'),
            });
        }
    };

    const handleClick = async () => {
        const urlResolver = getResolver();
        urlResolver[`/${url_key}`] = {
            type: 'PRODUCT',
        };
        await setResolver(urlResolver);
        setCookies('lastCategory', categorySelect);
        route.push('/[...slug]', `/${url_key}`);
    };

    const handleQuickView = async () => {
        window.backdropLoader(true);
        getProduct({
            variables: {
                url_key,
            },
        });
    };

    React.useMemo(() => {
        if (detailProduct.error) {
            window.backdropLoader(false);
        }
        if (!detailProduct.loading && detailProduct.data && detailProduct.data.products
            && detailProduct.data.products.items && detailProduct.data.products.items.length > 0) {
            window.backdropLoader(false);
            setOpenQuickView(true);
        }
    }, [detailProduct]);

    const ratingValue = review && review.rating_summary ? parseInt(review.rating_summary, 0) / 20 : 0;
    const DetailProps = {
        spesificProduct,
        handleClick,
        handleFeed,
        ratingValue,
        feed,
    };
    const showAddToCart = typeof enableAddToCart !== 'undefined' ? enableAddToCart : modules.catalog.productListing.addToCart.enabled;
    const showOption = typeof enableOption !== 'undefined'
        ? enableOption : modules.catalog.productListing.configurableOptions.enabled;
    const showQuickView = typeof enableQuickView !== 'undefined'
        ? enableQuickView : modules.catalog.productListing.quickView.enabled;
    if (isGrid) {
        return (
            <>
                {
                    openQuickView && showQuickView && (
                        <ModalQuickView
                            open={openQuickView}
                            onClose={() => setOpenQuickView(false)}
                            data={detailProduct.data.products}
                        />
                    )
                }
                <div className={classNames(styles.itemContainer, className, showQuickView ? styles.quickView : '')}>
                    {
                        modules.catalog.productListing.label.enabled && LabelView ? (
                            <LabelView t={t} {...other} isGrid={isGrid} spesificProduct={spesificProduct} />
                        ) : null
                    }
                    <div className={styles.imgItem}>
                        {
                            showQuickView && (
                                <button className="btn-quick-view" type="button" onClick={handleQuickView}>
                                    Quick View
                                </button>
                            )
                        }
                        <ImageProductView t={t} handleClick={handleClick} spesificProduct={spesificProduct} {...other} />
                    </div>
                    <div className={styles.detailItem}>
                        <DetailProductView t={t} {...DetailProps} {...other} />
                        {showOption ? (
                            <ConfigurableOpt
                                enableBundle={false}
                                enableDownload={false}
                                t={t}
                                data={{
                                    ...other, url_key,
                                }}
                                showQty={false}
                                catalogList={catalogList}
                                handleSelecteProduct={setSpesificProduct}
                                showAddToCart={showAddToCart}
                                propsItem={{
                                    className: styles.itemConfigurable,
                                }}
                                customStyleBtnAddToCard={styles.customBtnAddToCard}
                                labelAddToCart="Add to cart"
                                isGrid={isGrid}
                                {...other}
                            />
                        ) : null}
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            {
                openQuickView && showQuickView && (
                    <ModalQuickView
                        open={openQuickView}
                        onClose={() => setOpenQuickView(false)}
                        data={detailProduct.data.products}
                    />
                )
            }
            <div className={classNames(styles.listContainer, className, showQuickView ? styles.quickView : '')}>
                <div className={styles.listImgItem}>
                    {
                        modules.catalog.productListing.label.enabled && LabelView ? (
                            <LabelView t={t} {...other} isGrid={isGrid} spesificProduct={spesificProduct} />
                        ) : null
                    }
                    {
                        showQuickView && (
                            <button className="btn-quick-view" type="button" onClick={handleQuickView}>
                                Quick View
                            </button>
                        )
                    }
                    <ImageProductView t={t} handleClick={handleClick} spesificProduct={spesificProduct} {...other} />
                </div>
                <div style={{ flex: 0.2 }} />
                <div className={styles.listDetailItem}>
                    <DetailProductView t={t} {...DetailProps} {...other} />
                    {showOption ? (
                        <ConfigurableOpt
                            enableBundle={false}
                            enableDownload={false}
                            t={t}
                            data={{
                                ...other, url_key,
                            }}
                            showQty={false}
                            catalogList={catalogList}
                            handleSelecteProduct={setSpesificProduct}
                            showAddToCart={showAddToCart}
                            propsItem={{
                                className: styles.itemConfigurable,
                            }}
                            customStyleBtnAddToCard={styles.customBtnAddToCard}
                            labelAddToCart="Add to cart"
                            isGrid={isGrid}
                            {...other}
                        />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ProductItem;
