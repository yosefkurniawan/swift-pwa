/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */

import { useQuery } from '@apollo/client';
import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import { debuging, features, modules } from '@config';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/MagezonSingleProduct/style';
import { getProductList } from '@core_modules/cms/services/graphql';
import CustomButton from '@core_modules/commons/Button';
import Typography from '@core_modules/commons/Typography';
import OptionItem from '@core_modules/product/plugins/OptionItem';
import { addProductsToCompareList, addWishlist as mutationAddWishlist } from '@core_modules/product/services/graphql';
import { getCompareList, getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { getLoginInfo } from '@helper_auth';
import { useTranslation } from '@i18n';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import { getCookies } from '@root/core/helpers/cookies';
import { generateThumborUrl } from '@root/core/helpers/image';
import { localCompare } from '@services/graphql/schema/local';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Content = (props) => {
    // prettier-ignore
    const {
        product, product_display,
        product_addtocart, product_compare, product_shortdescription,
        product_image, product_price, product_review,
        product_swatches, product_wishlist, product_name,
    } = props;
    const isGrid = product_display === 'grid';

    // prettier-ignore
    const {
        name, url_key, id, __typename,
        price_range, price_tiers,
        special_from_date, special_to_date, review_count,
        short_description, small_image,
    } = product;

    const { t } = useTranslation();
    const [wishlist, setWishlist] = useState(false);
    const styles = useStyles();
    const router = useRouter();
    const [addWishlist] = mutationAddWishlist();
    const isLogin = getLoginInfo();
    const [price, setPrice] = useState({
        priceRange: price_range,
        priceTiers: price_tiers,
        productType: __typename,
        specialFromDate: special_from_date,
        specialToDate: special_to_date,
    });
    const [getProductCompare, { data: compareList, refetch }] = getCompareList();
    const [getUid, { data: dataUid, refetch: refetchCustomerUid }] = getCustomerUid();
    const [addProductCompare] = addProductsToCompareList();
    const { client } = useQuery(localCompare);
    const favoritIcon = wishlist ? <Favorite className={styles.iconShare} /> : <FavoriteBorderOutlined className={styles.iconShare} />;

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

    const handleClick = () => {
        router.push(url_key);
    };

    const handleAddtowishlist = () => {
        if (isLogin && isLogin === 1) {
            addWishlist({
                variables: {
                    productId: id,
                },
            })
                .then(async () => {
                    await setWishlist(!wishlist);
                    await window.toastMessage({ open: true, variant: 'success', text: t('common:message:feedSuccess') });
                    router.push('/wishlist');
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:message:feedFailed'),
                    });
                });
        } else {
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
            uid_customer = dataUid ? (dataUid.customer.compare_list ? dataUid.customer.compare_list.uid : '') : '';
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
                                item_count: res.data.addProductsToCompareList.item_count,
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

    return (
        <>
            <Grid container direction={isGrid ? 'column' : 'row'} alignItems={isGrid ? 'center' : 'stretch'} className="mgz-single-product-card">
                {product_image && (
                    <Grid item xs={isGrid ? 6 : 3} container justify="center">
                        <div onClick={handleClick} style={{ width: features.imageSize.product.width, maxWidth: '100%' }}>
                            <img
                                data-pagespeed-no-defer
                                src={generateThumborUrl(small_image.url, features.imageSize.product.width, features.imageSize.product.height)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/assets/img/placeholder.png';
                                }}
                                alt="mediaimage"
                            />
                        </div>
                    </Grid>
                )}
                <Grid item xs container direction="column" alignItems={isGrid ? 'center' : 'stretch'}>
                    {product_name && (
                        <Grid item>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                    )}
                    {product_review && (
                        <Grid item container justify={isGrid ? 'center' : 'flex-start'}>
                            <RatingStar value={review_count} />
                            <Typography variant="p" type="regular" letter="capitalize">
                                {review_count || 0} {review_count > 1 ? `${t('product:review')}s` : t('product:review')}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item container justify={isGrid ? 'center' : 'flex-start'}>
                        <Grid item>
                            {product_price && (
                                <div className="mgz-single-product-price">
                                    <PriceFormat {...price} />
                                </div>
                            )}
                            {product_shortdescription && (
                                <Link href={url_key}>
                                    <CmsRenderer content={short_description.html} />
                                </Link>
                            )}
                            <div className="mgz-single-product-option-item">
                                {__typename === 'GroupedProduct' ? (
                                    <CustomButton className={styles.btnAddToCart} onClick={handleClick}>
                                        <Typography align="center" type="bold" letter="uppercase" color="white" variant="inherit">
                                            {t('product:addToCart')}
                                        </Typography>
                                    </CustomButton>
                                ) : (
                                    <OptionItem
                                        data={product}
                                        setPrice={setPrice}
                                        t={t}
                                        noLabel
                                        noValidate
                                        customPos
                                        showSwatches={product_swatches}
                                        showQty={false}
                                        disabled={false}
                                        showAddToCart={product_addtocart}
                                        handleAddToCart={handleClick}
                                        customButton={
                                            <CustomButton className={styles.btnAddToCart} onClick={handleClick}>
                                                <Typography align="center" type="bold" letter="uppercase" color="white" variant="inherit">
                                                    {t('product:addToCart')}
                                                </Typography>
                                            </CustomButton>
                                        }
                                    />
                                )}
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {product_wishlist && (
                            <IconButton className={styles.btnShare} onClick={handleAddtowishlist}>
                                {favoritIcon}
                            </IconButton>
                        )}
                        {modules.productcompare.enabled && product_compare && (
                            <IconButton className={styles.btnShare} onClick={() => handleSetCompareList(id)}>
                                <CompareArrowsIcon className={styles.iconShare} />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <style jsx>
                {`
                    .mgz-single-product-option-item :global(> div:not(div[class*='btnAdd'])) {
                    }
                    .mgz-single-product-option-item :global(div[role='radiogroup']) {
                        ${isGrid ? 'justify-content: center;' : ''}
                    }
                    .mgz-single-product-price {
                        ${isGrid ? 'text-align: center;' : ''}
                    }
                `}
            </style>
        </>
    );
};

const MagezonSingleProduct = (props) => {
    // prettier-ignore
    const {
        description, border_hover_color,
        line_color, line_position, line_width, show_line,
        title, title_align, title_color, title_tag,
        product_addtocart, product_compare, product_shortdescription,
        product_image, product_price, product_review, product_display,
        product_swatches, product_wishlist, product_name, product_sku,
    } = props;
    const showLineClass = show_line ? 'mgz-single-product-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-single-product-heading-line--bottom' : '';
    const { data, loading } = getProductList({ filter: { sku: { eq: product_sku } } });

    if (loading) return null;

    return (
        <>
            <div className="mgz-single-product">
                <div className={`mgz-single-product-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-single-product-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div>{description}</div>
                </div>
                <div className="mgz-single-product-content">
                    {data.products.items[0] && (
                        <Content
                            product={data.products.items[0]}
                            product_addtocart={product_addtocart}
                            product_compare={product_compare}
                            product_image={product_image}
                            product_price={product_price}
                            product_review={product_review}
                            product_swatches={product_swatches}
                            product_wishlist={product_wishlist}
                            product_name={product_name}
                            product_shortdescription={product_shortdescription}
                            product_display={product_display}
                        />
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-single-product :global(img) {
                        max-width: 100%;
                    }
                    .mgz-single-product-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-single-product-heading-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width}px;
                        background-color: ${line_color};
                    }
                    .mgz-single-product-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-single-product-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-single-product-heading-title :global(*[class*='Typography']) {
                        ${title_color ? `color: ${title_color};` : ''}
                    }
                    .mgz-single-product :global(.mgz-single-product-card:hover) {
                        border: 1px solid ${border_hover_color || '#ffffff'};
                        box-shadow: 0px 20px 50px -20px rgb(0 0 0 / 50%) !important;
                        position: relative;
                        z-index: 2;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonSingleProduct;
