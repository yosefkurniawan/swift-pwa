import Button from '@components/Button';
import Typography from '@components/Typography';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import classNames from 'classnames';
import Link from 'next/link';
import route from 'next/router';
import React from 'react';
import PriceFormat from '@components/PriceFormat';
import Toast from '@components/Toast';
import { GraphCustomer } from '@services/graphql';
import { getLoginInfo } from '@helpers/auth';
import useStyles from './style';
import ConfigurableOpt from './component/configurable';

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
        showFeed = true,
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
                    <Link href="/[...slug]" as={`/${url_key}`}>
                        <a>
                            <img
                                // eslint-disable-next-line no-nested-ternary
                                src={spesificProduct.id ? spesificProduct.image.url
                                    : small_image && small_image.url
                                        ? small_image.url
                                        : '/assets/img/placeholder.png'}
                                className={styles.imgProduct}
                                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                                alt={small_image && small_image.url ? small_image.label : 'Product'}
                            />
                        </a>
                    </Link>
                </div>
                <div className={styles.detailItem}>
                    <div className={styles.descItem}>
                        {showFeed && (
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
                        <Link href="/[...slug]" as={`/${url_key}`}>
                            <a style={{ maxWidth: 'calc(100% - 34px)' }}>
                                <Typography
                                    variant="p"
                                    className={styles.clearMarginPadding}
                                    letter="capitalize"
                                >
                                    {name}
                                </Typography>
                            </a>
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
