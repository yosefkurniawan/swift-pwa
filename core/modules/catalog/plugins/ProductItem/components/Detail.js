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
    } = props;
    const styles = useStyles();
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? <Favorite className={classFeedActive} /> : <FavoriteBorderOutlined className={styles.iconFeed} />;
    const showWishlist = typeof enableWishlist !== 'undefined' ? enableWishlist : modules.wishlist.enabled;
    const showRating = typeof enableRating !== 'undefined' ? enableRating : storeConfig?.pwa?.rating_enable;
    const enableMultiSeller = storeConfig.enable_oms_multiseller === '1';
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
            {enableMultiSeller && seller.seller_name && (
                <div className={styles.infoSeller}>
                    <StorefrontIcon className={styles.iconSeller} />
                    <Typography variant="p" className={styles.productTitle} letter="capitalize">
                        {seller.seller_name}
                    </Typography>
                </div>
            )}
            {showRating && <RatingStar value={ratingValue} />}
            {enablePrice && (
                <PriceFormat
                    // eslint-disable-next-line camelcase
                    priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                    // eslint-disable-next-line camelcase
                    priceTiers={spesificProduct.price_tiers ? spesificProduct.price_tiers : price_tiers}
                    productType={__typename}
                    specialFromDate={special_from_date}
                    specialToDate={special_to_date}
                />
            )}
        </div>
    );
};

export default Detail;
