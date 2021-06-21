/* eslint-disable jsx-a11y/anchor-is-valid */
import { modules, debuging } from '@config';
import { getLoginInfo } from '@helper_auth';
import { setCookies, getCookies } from '@helper_cookies';
import { useTranslation } from '@i18n';
import route from 'next/router';
import { useQuery } from '@apollo/client';
import React from 'react';
import { setResolver, getResolver } from '@helper_localstorage';
import classNames from 'classnames';
import ConfigurableOpt from '@plugin_optionitem';
import dynamic from 'next/dynamic';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Button from '@material-ui/core/IconButton';
import { addWishlist, getDetailProduct } from '@core_modules/catalog/services/graphql';
import useStyles from '@plugin_productitem/style';
import { addProductsToCompareList } from '@core_modules/product/services/graphql';
import { getCompareList, getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { localCompare } from '@services/graphql/schema/local';

const ModalQuickView = dynamic(() => import('@plugin_productitem/components/QuickView'), { ssr: false });
const WeltpixelLabel = dynamic(() => import('@plugin_productitem/components/WeltpixelLabel'), { ssr: false });

const ProductItem = (props) => {
    const {
        id, url_key = '', categorySelect, review, ImageProductView, DetailProductView, LabelView, className = '',
        enableAddToCart, enableOption, enableQuickView, isGrid = true, catalogList, weltpixel_labels, ...other
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
    const [getProductCompare, { data: compareList, refetch }] = getCompareList();
    const [getUid, { data: dataUid, refetch: refetchCustomerUid }] = getCustomerUid();
    const [addProductCompare] = addProductsToCompareList();
    const { client } = useQuery(localCompare);

    React.useEffect(() => {
        if (!compareList && modules.productcompare.enabled) {
            const uid_product = getCookies('uid_product_compare');
            if (uid_product) {
                getProductCompare({
                    variables: {
                        uid: uid_product,
                    },
                });
            }
        }
    }, [compareList]);

    React.useEffect(() => {
        if (isLogin && !dataUid && modules.productcompare.enabled) {
            getUid();
        }
    }, [isLogin, dataUid]);

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

    const handleSetCompareList = (id_compare) => {
        const uid_product_compare = getCookies('uid_product_compare');
        const uids = [];
        let uid_customer = '';
        uids.push(id_compare.toString());
        if (isLogin) {
            /* eslint-disable */
            uid_customer = dataUid ? (dataUid.customer.compare_list ? dataUid.customer.compare_list.uid : '') : '';
            /* eslint-enable */
        }
        let isExist = false;
        if (compareList) {
            compareList.compareList.items.map((res) => {
                if (res.uid === id_compare.toString()) {
                    isExist = true;
                }
                return null;
            });
            if (!isExist) {
                addProductCompare({
                    variables: {
                        uid: isLogin ? uid_customer : uid_product_compare,
                        products: uids,
                    },
                })
                    .then(async (res) => {
                        await window.toastMessage({ open: true, variant: 'success', text: t('common:productCompare:successCompare') });
                        client.writeQuery({
                            query: localCompare,
                            data: {
                                compareList: {
                                    __typename: 'Product_Compare',
                                    item_count: res.data.addProductsToCompareList.item_count,
                                },
                            },
                        });
                        refetch();
                        if (isLogin) {
                            refetchCustomerUid();
                        }
                    })
                    .catch((e) => {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
                        });
                    });
            } else {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('common:productCompare:existProduct'),
                });
            }
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
    const enableProductCompare = modules.productcompare.enabled;
    const DetailProps = {
        spesificProduct,
        handleClick,
        handleFeed,
        ratingValue,
        feed,
        id,
        handleSetCompareList,
        enableProductCompare,
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
                            t={t}
                            weltpixel_labels={weltpixel_labels}
                        />
                    )
                }
                <div className={classNames(styles.itemContainer, 'item-product', className, showQuickView ? styles.quickView : '')}>
                    {
                        modules.catalog.productListing.label.enabled && LabelView ? (
                            <LabelView t={t} {...other} isGrid={isGrid} spesificProduct={spesificProduct} />
                        ) : null
                    }
                    <div className={styles.imgItem}>
                        {
                            modules.catalog.productListing.label.enabled
                            && modules.catalog.productListing.label.weltpixel.enabled && (
                                <WeltpixelLabel t={t} weltpixel_labels={weltpixel_labels} categoryLabel />
                            )
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
                    <div className={styles.detailItem}>
                        <DetailProductView t={t} {...DetailProps} {...other} catalogList={catalogList} />
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
    // eslint-disable-next-line react/destructuring-assignment
    const showWishlist = typeof props.enableWishlist !== 'undefined' ? props.enableWishlist : modules.wishlist.enabled;
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? <Favorite className={classFeedActive} /> : <FavoriteBorderOutlined className={styles.iconFeed} />;

    return (
        <>
            {
                openQuickView && showQuickView && (
                    <ModalQuickView
                        open={openQuickView}
                        onClose={() => setOpenQuickView(false)}
                        data={detailProduct.data.products}
                        t={t}
                        weltpixel_labels={weltpixel_labels}
                    />
                )
            }
            <div className={classNames(styles.listContainer, className, showQuickView ? styles.quickView : '')}>
                <div className="row start-xs">
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                        <div className={styles.listImgItem}>
                            {
                                modules.catalog.productListing.label.enabled && LabelView ? (
                                    <LabelView t={t} {...other} isGrid={isGrid} spesificProduct={spesificProduct} />
                                ) : null
                            }
                            {
                                modules.catalog.productListing.label.enabled
                                && modules.catalog.productListing.label.weltpixel.enabled && (
                                    <WeltpixelLabel t={t} weltpixel_labels={weltpixel_labels} categoryLabel />
                                )
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
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-8 col-lg-9">
                        <div className="row start-xs">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <DetailProductView
                                    t={t}
                                    {...DetailProps}
                                    {...other}
                                    enableWishlist={false}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
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
                                // eslint-disable-next-line indent
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showWishlist && (
                        <Button
                            className={styles.btnFeed}
                            onClick={handleFeed}
                        >
                            {FeedIcon}
                        </Button>
                    )
                }
            </div>
        </>
    );
};

export default ProductItem;
