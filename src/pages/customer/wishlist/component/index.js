/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import { GraphCustomer } from '@services/graphql';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Message from '@components/Toast';
import Alert from '@material-ui/lab/Alert';
import Loading from '@components/Loaders/Backdrop';
import { getCartId } from '@helpers/cartId';
import React from 'react';
import Router from 'next/router';
import useStyles from './style';
import Loaders from './Loader';
import Item from './Item';
import { addSimpleProductsToCart } from '../services/graphql';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const { token, t } = props;
    let wishlist = [];

    const [addToCart] = addSimpleProductsToCart(token);
    const [removeWishlist] = GraphCustomer.removeWishlist(token);
    const {
        data, loading, error, refetch,
    } = GraphCustomer.getCustomer(token);

    const [state, setState] = React.useState({
        loading: false,
        openMessage: false,
        textMessage: '',
        variantMessage: 'success',
    });

    if (!data || loading || error) return <Loaders />;
    if (data) {
        wishlist = data.customer.wishlist.items.map(({ id, product }) => ({
            ...product,
            wishlistId: id,
            name: product.name,
            link: product.url_key,
            imageSrc: product.small_image.url || '/assets/img/placeholder.png',
            price: product.price_range.minimum_price.regular_price.value,
        }));
    }
    let cartId = '';

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }


    const handleToCart = ({ sku, url_key, wishlistId }) => {
        setState({
            ...state,
            loading: true,
        });
        addToCart({
            variables: {
                cartId,
                sku,
                qty: parseFloat(1),
            },
        }).then(() => {
            removeWishlist({
                variables: {
                    wishlistId,
                },
            }).then(() => {
                setState({
                    ...state,
                    loading: false,
                    openMessage: true,
                    variantMessage: 'success',
                    textMessage: t('product:successAddCart'),
                });
                refetch();
            });
        }).catch(async (e) => {
            await setState({
                ...state,
                loading: false,
                openMessage: true,
                variantMessage: 'error',
                textMessage: e.message.split(':')[1] || t('product:failedAddCart'),
            });
            if (e.message.split(':')[1].includes('choose option')) {
                Router.push('/[...slug]', `/${url_key}`);
            }
        });
    };

    const handleRemove = ({ wishlistId }) => {
        setState({
            ...state,
            loading: true,
        });
        removeWishlist({
            variables: {
                wishlistId,
            },
        })
            .then(() => {
                setState({
                    ...state,
                    loading: false,
                    openMessage: true,
                    variantMessage: 'success',
                    textMessage: t('customer:wishlist:removeSuccess'),
                });
                refetch();
            })
            .catch((e) => {
                setState({
                    ...state,
                    loading: false,
                    openMessage: true,
                    variantMessage: 'error',
                    textMessage: e.message.split(':')[1] || t('customer:wishlist:removeFailed'),
                });
            });
    };

    const handleAddAlltoBag = async () => {
        await setState({ ...state, loading: true });
        let errorCart = false;
        await wishlist.map((item) => {
            if (item.__typename === 'SimpleProduct') {
                addToCart({
                    variables: {
                        cartId,
                        sku: item.sku,
                        qty: parseFloat(1),
                    },
                }).then(() => {
                    removeWishlist({
                        variables: {
                            wishlistId: item.wishlistId,
                        },
                    });
                }).catch(() => {
                    errorCart = true;
                });
            } else {
                errorCart = true;
            }
        });
        setTimeout(() => {
            setState({
                ...state,
                loading: false,
                openMessage: true,
                textMessage: errorCart ? 'All wishlist not added to cart, You must select config product' : 'Success add wishlist all to cart',
                variantMessage: errorCart ? 'error' : 'success',
            });
            refetch();
        }, 2000);
    };

    const handleClose = () => {
        setState({
            ...state,
            openMessage: !state.openMessage,
        });
    };

    return (
        <>
            <Loading open={state.loading} />
            <Message open={state.openMessage} variant={state.variantMessage} setOpen={handleClose} message={state.textMessage} />
            <div className={styles.root}>
                {
                    wishlist.length === 0 && (
                        <Alert className="m-15" severity="warning">{t('customer:wishlist:notFound')}</Alert>
                    )
                }
                {wishlist.map((item, index) => (
                    <Item key={index} {...item} {...props} refetch={refetch} handleRemove={handleRemove} handleToCart={handleToCart} />
                ))}
                <div className={styles.footer}>
                    <Button onClick={handleAddAlltoBag} disabled={loading || wishlist.length === 0} fullWidth className={styles.btnSigin}>
                        <Typography variant="title" type="regular" letter="capitalize" color="white">
                            {t('customer:wishlist:addAllToBag')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Content;
