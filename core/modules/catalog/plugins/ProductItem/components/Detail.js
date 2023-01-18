/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import { modules } from '@config';
import Button from '@material-ui/core/IconButton';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import StorefrontIcon from '@material-ui/icons/Storefront';
import useStyles from '@plugin_productitem/style';
import { getPriceFromList } from '@core_modules/product/helpers/getPrice';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

const Detail = (props) => {
    const {
        spesificProduct,
        handleClick,
        name,
        handleFeed,
        ratingValue,
        __typename,
        price_range,
        price_tiers,
        feed,
        id,
        special_from_date,
        special_to_date,
        enableWishlist,
        handleSetCompareList,
        enableRating,
        enablePrice = true,
        enableProductCompare,
        storeConfig = {},
        seller,
        urlKey,
        price: dataPrice,
        loadPrice,
        errorPrice,
    } = props;
    const styles = useStyles();
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? <Favorite className={classFeedActive} /> : <FavoriteBorderOutlined className={styles.iconFeed} />;
    const showWishlist = typeof enableWishlist !== 'undefined' ? enableWishlist : modules.wishlist.enabled;
    const showRating = typeof enableRating !== 'undefined' ? enableRating : storeConfig?.pwa?.rating_enable;
    const priceData = getPriceFromList(dataPrice, id);
    const enableMultiSeller = storeConfig.enable_oms_multiseller === '1';

    const generatePrice = (priceDataItem = []) => {
        // handle if loading price

        if (loadPrice) {
            return (
                <div className="mgz-single-product-price">
                    <Skeleton variant="text" width={100} />
                    {' '}
                </div>
            );
        }

        let priceProduct = {
            priceRange: spesificProduct.price_range ? spesificProduct.price_range : price_range,
            // eslint-disable-next-line camelcase
            priceTiers: spesificProduct.price_tiers ? spesificProduct.price_tiers : price_tiers,
            productType: __typename,
            specialFromDate: special_from_date,
            specialToDate: special_to_date,
        };
        if (priceDataItem && priceDataItem.length > 0 && !loadPrice && !errorPrice) {
            priceProduct = {
                priceRange: spesificProduct.price_range ? spesificProduct.price_range : priceDataItem[0].price_range,
                priceTiers: spesificProduct.price_tiers ? spesificProduct.price_tiers : priceDataItem[0].price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: priceDataItem[0].__typename,
                specialFromDate: priceDataItem[0].special_from_date,
                specialToDate: priceDataItem[0].special_to_date,
            };
        }

        return (
            <div className="mgz-single-product-price">
                {
                    priceProduct && (
                        <PriceFormat
                            {...priceProduct}
                            specialFromDate={special_from_date}
                            specialToDate={special_to_date}
                        />
                    )
                }
            </div>
        );
    };
    return (
        <div className={styles.descItem}>
            {showWishlist && (
                <Button className={styles.btnFeed} onClick={() => handleFeed(props)}>
                    {FeedIcon}
                </Button>
            )}
            {enableProductCompare && (
                <Button className={styles.btnCompare} onClick={() => handleSetCompareList(id)}>
                    <CompareArrowsIcon className={styles.iconCompare} />
                </Button>
            )}
            <Link href="/[...slug]" as={`/${urlKey}`} className={styles.productLinkButton}>
                <a onClick={() => handleClick(props)} className={styles.productTitle} id="plugin-productTitle-typography">
                    {name}
                </a>
            </Link>
            {enableMultiSeller && seller && seller.seller_name && (
                <div className={styles.infoSeller}>
                    <StorefrontIcon className={styles.iconSeller} />
                    <Typography variant="p" className={styles.productTitle} letter="capitalize">
                        {seller.seller_name}
                    </Typography>
                </div>
            )}
            {showRating && <RatingStar value={ratingValue} />}
            {enablePrice && (
                generatePrice(priceData)
            )}
        </div>
    );
};

export default Detail;
