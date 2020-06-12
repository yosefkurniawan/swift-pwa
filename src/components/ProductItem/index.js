/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import Typography from '@components/Typography';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import classNames from 'classnames';
import route from 'next/router';
import React from 'react';
import PriceFormat from '@components/PriceFormat';
import Toast from '@components/Toast';
import { GraphCustomer } from '@services/graphql';
import { getLoginInfo } from '@helpers/auth';
import { setCookies } from '@helpers/cookies';
import { imageSize, productItem } from '@config';
import useStyles from './style';
import ConfigurableOpt from './component/configurable';
import Thumbor from '../Image/thumbor';

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
    } = props;
    const styles = useStyles();
    const [feed, setFeed] = React.useState(false);
    const [spesificProduct, setSpesificProduct] = React.useState({});
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const [message, setMessage] = React.useState({
        open: false, text: '', variant: 'success',
    });
    const FeedIcon = feed ? (
        <Favorite className={classFeedActive} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconFeed} />
    );
    const { showWishlistAction } = productItem;

    let isLogin = '';
    if (typeof window !== 'undefined') isLogin = getLoginInfo();
    const [addWishlist] = GraphCustomer.addWishlist();

    const handleFeed = () => {
        if (isLogin) {
            addWishlist({
                variables: {
                    productId: id,
                },
            }).then(async () => {
                await setMessage({ open: true, variant: 'success', text: 'add wishlist success' });
                route.push('/wishlist');
            }).catch((e) => {
                setMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || 'add wishlist failed',
                });
            });
        }
        setFeed(!feed);
    };

    const handleClick = () => {
        setCookies('lastCategory', categorySelect);
        route.push('/[...slug]', `/${url_key}`);
    };

    return (
        <>
            <Toast
                open={message.open}
                setOpen={() => setMessage({ ...message, open: false })}
                message={message.text}
                variant={message.variant}
            />
            <div className={styles.itemContainer}>
                <div className={styles.imgItem}>
                    <Link onClick={handleClick}>
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
                        style={{ ...(showWishlistAction ? {} : { alignItems: 'center' }) }}
                    >
                        {showWishlistAction && (
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
                        <PriceFormat
                            // eslint-disable-next-line camelcase
                            priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                            // eslint-disable-next-line camelcase
                            priceTiers={spesificProduct.price_tiers ? spesificProduct.price_tiers : price_tiers}
                            productType={__typename}
                        />
                    </div>
                    <ConfigurableOpt
                        configurable_options={configurable_options}
                        variants={variants}
                        setSpesificProduct={setSpesificProduct}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductItem;
