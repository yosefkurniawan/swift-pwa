/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import RatingStar from '@common_ratingstar';
import { modules } from '@config';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { useProduct } from '@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/helpers/useProduct';
import Typography from '@core_modules/commons/Typography';
import { useTranslation } from '@i18n';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Link from 'next/link';
import Image from '@common_image';
import dynamic from 'next/dynamic';
import { getPriceFromList } from '@core_modules/product/helpers/getPrice';
import Skeleton from '@material-ui/lab/Skeleton';

const PriceFormat = dynamic(() => import('@common_priceformat'), { ssr: false });

const SingleProduct = (props) => {
    // prettier-ignore
    const {
        type,
        product, product_display,
        product_compare, product_shortdescription,
        product_image, product_review,
        product_wishlist, product_name,
        item_xl, item_lg, item_md, item_sm, item_xs, storeConfig, dataPrice = [], loadingPrice, errorPrice,
    } = props;
    const isGrid = product_display && product_display === 'grid';
    const isProductGrid = type === 'product_grid';
    const isSlider = type === 'product_slider';
    const userAgent = navigator && navigator.appVersion;
    const regex = (/iPhone|iPad|iPod/i);
    const isIOS = regex.test(userAgent);
    const { t } = useTranslation();
    // prettier-ignore
    const {
        name, url_key, id, review_count,
        short_description, small_image, seller,
    } = product;
    // prettier-ignore

    const enableMultiSeller = storeConfig.enable_oms_multiseller === '1';
    const {
        styles, wishlist,
        price,
        handleAddtowishlist, handleClick, handleSetCompareList,
    } = useProduct({ product, t });

    const favoritIcon = wishlist ? <Favorite className={styles.iconShare} /> : <FavoriteBorderOutlined className={styles.iconShare} />;

    const getCol5Classes = () => {
        let classes = '';
        if (item_xl === 5) {
            classes += 'col-xl-5 ';
        }
        if (item_lg === 5) {
            classes += 'col-lg-5 ';
        }
        if (item_md === 5) {
            classes += 'col-md-5 ';
        }
        if (item_sm === 5) {
            classes += 'col-sm-5 ';
        }
        if (item_xs === 5) {
            classes += 'col-xs-5 ';
        }

        return classes;
    };

    const responsiveProps = isProductGrid ? {
        xl: isProductGrid && item_xl !== 5 && 12 / item_xl,
        lg: isProductGrid && item_lg !== 5 && 12 / item_lg,
        md: isProductGrid && item_md !== 5 && 12 / item_md,
        sm: isProductGrid && item_sm !== 5 && 12 / item_sm,
        xs: isProductGrid && item_xs !== 5 && 12 / item_xs,
    } : {};

    const priceData = getPriceFromList(dataPrice, product.id);

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    const generatePrice = (priceDataItem, priceItem) => {
        // handle if loading price
        if (loadingPrice) {
            return (<div className="mgz-single-product-price"><Skeleton variant="text" width={100} /> </div>);
        }

        let priceProduct = priceItem;
        if (priceDataItem.length > 0 && !loadingPrice && !errorPrice) {
            priceProduct = {
                priceRange: priceDataItem[0].price_range,
                priceTiers: priceDataItem[0].price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: priceDataItem[0].__typename,
                specialFromDate: priceDataItem[0].special_from_date,
                specialToDate: priceDataItem[0].special_to_date,
            };
        }
        return (
            <div className="mgz-single-product-price">
                {
                    priceProduct && <PriceFormat {...priceProduct} />
                }
            </div>
        );
    };
    return (
        <>
            <Grid
                item={isProductGrid}
                container
                direction={isGrid || isProductGrid || isSlider ? 'column' : 'row'}
                alignItems={isGrid || isSlider ? 'center' : 'stretch'}
                className={`mgz-single-product-card ${getCol5Classes()}`}
                {...responsiveProps}
            >
                {product_image && (
                    <Grid
                        item
                        xs={isGrid ? 6 : isProductGrid || isSlider ? false : 3}
                        container
                        justify="center"
                        alignItems={isProductGrid ? 'center' : 'stretch'}
                    >
                        <Link href={handleClick} prefetch={false}>
                            <a style={{ width: defaultWidth }}>
                                <Image
                                    src={small_image.url}
                                    width={defaultWidth}
                                    height={defaultHeight}
                                    alt={name}
                                    storeConfig={storeConfig}
                                />
                            </a>
                        </Link>
                    </Grid>
                )}
                <Grid
                    item
                    xs={!isSlider}
                    container={!isIOS}
                    direction="column"
                    justify="center"
                    alignItems={isGrid || isProductGrid || isSlider ? 'center' : 'stretch'}
                >
                    {product_name && (
                        <Grid item>
                            <Typography variant="h4" className={styles.productTitle}>{name}</Typography>
                        </Grid>
                    )}
                    {enableMultiSeller && seller.seller_name && (
                        <div className={styles.infoSeller}>
                            <StorefrontIcon className={styles.iconSeller} />
                            <Typography variant="h4">
                                {seller.seller_name}
                            </Typography>
                        </div>
                    )}
                    {product_review && (
                        <Grid item container justify={isGrid || isProductGrid || isSlider ? 'center' : 'flex-start'}>
                            <RatingStar value={review_count} />
                            <Typography variant="p" type="regular" letter="capitalize">
                                {review_count || 0} {review_count > 1 ? `${t('product:review')}s` : t('product:review')}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item container justify={isGrid || isProductGrid || isSlider ? 'center' : 'flex-start'}>
                        <Grid item>
                            {generatePrice(priceData, price)}
                            {product_shortdescription && (
                                <Link href={url_key} prefetch={false}>
                                    <CmsRenderer content={short_description.html} />
                                </Link>
                            )}
                        </Grid>
                        {(!isGrid && !isSlider) && (
                            <Grid item style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                {modules.wishlist.enabled && product_wishlist && (
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
                        )}
                    </Grid>
                    {(isGrid || isSlider) && (
                        <Grid item>
                            {modules.wishlist.enabled && product_wishlist && (
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
                    )}
                </Grid>
            </Grid>
            <style jsx>
                {`
                    .mgz-single-product-option-item {
                        margin-top: 10px;
                    }
                    .mgz-single-product-option-item :global(> div:not(div[class*='btnAdd'])) {
                    }
                    .mgz-single-product-option-item :global(div[role='radiogroup']) {
                        ${isGrid ? 'justify-content: center;' : ''}
                    }
                    .mgz-single-product-price {
                        ${isGrid || isProductGrid ? 'text-align: center;' : ''}
                    }
                    @media (max-width: 600px) {
                        .mgz-single-product-option-item :global(div[role='radiogroup'] > div) {
                            margin: 2px 5px;
                        }
                        .mgz-single-product-option-item :global(div[role='radiogroup'] > div > span) {
                            font-size: 11px;
                        }
                        .mgz-single-product-option-item :global(div[class*='btnAdd'] button) {
                            font-size: 11px;
                            height: 31px;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-single-product-card:hover {
                        ${isProductGrid && `
                            border: 1px solid #bbbbbb;
                            position: relative;
                            z-index: 2;
                        `}
                    }
                `}
            </style>
        </>
    );
};

export default SingleProduct;
