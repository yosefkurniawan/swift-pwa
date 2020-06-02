/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import { GraphCustomer } from '@services/graphql';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Message from '@components/Toast';
import Alert from '@material-ui/lab/Alert';
import Loading from '@components/Loaders/Backdrop';
import { getCartId, setCartId } from '@helpers/cartId';
import { getCartIdUser } from '@services/graphql/schema/cart';
import { useQuery } from '@apollo/react-hooks';
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
    const cartUser = useQuery(getCartIdUser, {
        context: {
            headers: { Authorization: `Bearer ${token}` },
        },
        skip: token === '' || !token,
    });

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
            wishlistItemId: id,
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

    const handleToCart = ({
        sku, url_key, wishlistItemId, __typename,
    }) => {
        console.log(__typename);
        if (__typename === 'ConfigurableProduct') {
            Router.push('/[...slug]', `/${url_key}`);
        } else {
            setState({
                ...state,
                loading: true,
            });
            if (cartId === '' || !cartId) {
                const cartToken = cartUser.data.customerCart.id || '';
                cartId = cartToken;
                setCartId(cartToken);
            }
            addToCart({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(1),
                },
            })
                .then(() => {
                    removeWishlist({
                        variables: {
                            wishlistItemId,
                        },
                    }).then(() => {
                        setState({
                            ...state,
                            loading: false,
                            openMessage: true,
                            variantMessage: 'success',
                            textMessage: t('wishlist:successAddCart'),
                        });
                        refetch();
                    });
                })
                .catch(async (e) => {
                    await setState({
                        ...state,
                        loading: false,
                        openMessage: true,
                        variantMessage: 'error',
                        textMessage: e.message.split(':')[1] || t('wishlist:failedAddCart'),
                    });
                });
        }
    };

    const handleRemove = ({ wishlistItemId }) => {
        setState({
            ...state,
            loading: true,
        });
        removeWishlist({
            variables: {
                wishlistItemId,
            },
        })
            .then(() => {
                setState({
                    ...state,
                    loading: false,
                    openMessage: true,
                    variantMessage: 'success',
                    textMessage: t('wishlist:removeSuccess'),
                });
                refetch();
            })
            .catch((e) => {
                setState({
                    ...state,
                    loading: false,
                    openMessage: true,
                    variantMessage: 'error',
                    textMessage: e.message.split(':')[1] || t('wishlist:removeFailed'),
                });
            });
    };

    const handleAddAlltoBag = async () => {
        await setState({ ...state, loading: true });
        let totalSucces = 0;
        let errorCart = [false, ''];
        if (cartId === '' || !cartId) {
            const cartToken = cartUser.data.customerCart.id || '';
            cartId = cartToken;
            setCartId(cartToken);
        }
        await wishlist.map(async (item) => {
            addToCart({
                variables: {
                    cartId,
                    sku: item.sku,
                    qty: parseFloat(1),
                },
            })
                .then(async () => {
                    totalSucces += 1;
                    removeWishlist({
                        variables: {
                            wishlistItemId: item.wishlistItemId,
                        },
                    });
                })
                .catch((e) => {
                    errorCart = [true, e.message.split(':')[1]];
                });
        });
        setTimeout(async () => {
            refetch();
            await setState({
                ...state,
                loading: false,
                openMessage: true,
                textMessage: errorCart[0]
                    ? totalSucces > 0
                        // eslint-disable-next-line max-len
                        ? `${t('wishlist:addPartToBagSuccess').split('$'[0])} ${totalSucces} ${t('wishlist:addPartToBagSuccess').split('$'[1])}`
                        : errorCart[1] || t('product:failedAddCart')
                    : t('wishlist:addAllToBagSuccess'),
                variantMessage: errorCart[0] ? 'error' : 'success',
            });
        }, 3000);
    };

    const handleClose = () => {
        setState({
            ...state,
            openMessage: !state.openMessage,
        });
    };

    return (
        <div className={styles.root}>
            <Loading open={state.loading} />
            <Message open={state.openMessage} variant={state.variantMessage} setOpen={handleClose} message={state.textMessage} />
            {wishlist.length === 0 && (
                <Alert className="m-15" severity="warning">
                    {t('wishlist:notFound')}
                </Alert>
            )}
            <div className={styles.content}>
                {wishlist.map((item, index) => (
                    <Item key={index} {...item} {...props} refetch={refetch} handleRemove={handleRemove} handleToCart={handleToCart} />
                ))}
            </div>
            <div className={styles.footer}>
                <Button onClick={handleAddAlltoBag} disabled={loading || wishlist.length === 0} fullWidth>
                    <Typography variant="title" type="regular" letter="capitalize" color="white">
                        {t('wishlist:addAllToBag')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default Content;
