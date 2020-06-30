/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import Typography from '@components/Typography';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import classNames from 'classnames';
import route from 'next/router';
import React from 'react';
import PriceFormat from '@components/PriceFormat';
import { GraphCustomer } from '@services/graphql';
import { getLoginInfo } from '@helpers/auth';
import { setCookies } from '@helpers/cookies';
import { imageSize, features } from '@config';
import { useTranslation } from '@i18n';
import RatingStar from '@components/RatingStar';
import useStyles from './style';
import ConfigurableOpt from './component/configurable';
import Thumbor from '../Image';

const ProductItem = (props) => {
    const {
        id,
        name,
        small_image,
        // eslint-disable-next-line camelcase
        price_range,
        // eslint-disable-next-line camelcase
        price_tiers,
        url_key = '',
        __typename,
        variants = [],
        configurable_options = [],
        categorySelect,
        review,
    } = props;
    const styles = useStyles();
    const { t } = useTranslation(['wishlist']);
    const [feed, setFeed] = React.useState(false);
    const [spesificProduct, setSpesificProduct] = React.useState({});
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? (
        <Favorite className={classFeedActive} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconFeed} />
    );

    let isLogin = '';
    if (typeof window !== 'undefined') isLogin = getLoginInfo();
    const [addWishlist] = GraphCustomer.addWishlist();

    const handleFeed = () => {
        if (isLogin && isLogin !== '') {
            addWishlist({
                variables: {
                    productId: id,
                },
            }).then(async () => {
                await setFeed(!feed);
                await window.toastMessage({ open: true, variant: 'success', text: 'add wishlist success' });
                route.push('/wishlist');
            }).catch((e) => {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || 'add wishlist failed',
                });
            });
        } else if (typeof window.toastMessage !== 'undefined') {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('wishlist:addWithoutLogin'),
            });
        }
    };

    const handleClick = () => {
        setCookies('lastCategory', categorySelect);
        route.push('/[...slug]', `/${url_key}`);
    };

    const ratingValue = (review && review.rating_summary) ? parseInt(review.rating_summary, 0) / 20 : 0;

    return (
        <>
            <div className={styles.itemContainer}>
                <div className={styles.imgItem}>
                    <Link onClick={handleClick} style={{ width: '100%' }}>
                        <Thumbor
                            // eslint-disable-next-line no-nested-ternary
                            src={spesificProduct.id ? spesificProduct.image.url
                                : small_image && small_image.url
                                    ? small_image.url
                                    : '/assets/img/placeholder.png'}
                            className={styles.imgProduct}
                            width={imageSize.product.width}
                            height={imageSize.product.height}
                            quality={80}
                            alt={small_image && small_image.url ? small_image.label : name}
                        />
                    </Link>
                </div>
                <div className={styles.detailItem}>
                    <div
                        className={styles.descItem}
                        style={{ ...(features.productListing.wishlist ? {} : { alignItems: 'center' }) }}
                    >
                        {features.productListing.wishlist && (
                            <div style={{
                                position: 'absolute',
                                width: '20px',
                                top: '-4px',
                                right: '14px',
                                textAlign: 'right',
                            }}
                            >
                                <Button
                                    className={styles.btnFeed}
                                    variant="text"
                                    onClick={handleFeed}
                                >
                                    {FeedIcon}
                                </Button>
                            </div>
                        )}
                        <Link onClick={handleClick} className={styles.productLinkButton}>
                            <Typography
                                variant="p"
                                className={styles.clearMarginPadding}
                                letter="capitalize"
                            >
                                {name}
                            </Typography>
                        </Link>
                        {
                            features.productListing.rating && (
                                <RatingStar value={ratingValue} />
                            )
                        }
                        <PriceFormat
                            // eslint-disable-next-line camelcase
                            priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                            // eslint-disable-next-line camelcase
                            priceTiers={spesificProduct.price_tiers ? spesificProduct.price_tiers : price_tiers}
                            productType={__typename}
                        />
                    </div>
                    {features.productListing.configurableOptions ? (
                        <ConfigurableOpt
                            configurable_options={configurable_options}
                            variants={variants}
                            setSpesificProduct={setSpesificProduct}
                        />
                    ) : null}

                </div>
            </div>
        </>
    );
};

export default ProductItem;
