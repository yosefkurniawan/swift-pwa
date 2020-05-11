/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import { GraphCustomer } from '@services/graphql';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Message from '@components/Toast';
import Loading from '@components/Loaders/Backdrop';
import { getCartId } from '@helpers/cartId';
import React from 'react';
import useStyles from './style';
import Loaders from './Loader';
import Item from './Item';
import { addSimpleProductsToCart } from '../services/graphql';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const { token, t } = props;
    let wishlist = [];
    const {
        data, loading, error, refetch,
    } = GraphCustomer.getCustomer(token);

    const [state, setState] = React.useState({
        loading: false,
        openMessage: false,
        textMessage: '',
        variantMessage: 'success',
    });

    if (!data || loading) return <Loaders />;
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
    if (error) console.log(error);
    let cartId = '';

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    const [addToCart] = addSimpleProductsToCart(token);
    const [removeWishlist] = GraphCustomer.removeWishlist(token);

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
                {wishlist.map((item, index) => (
                    <Item key={index} {...item} {...props} refetch={refetch} />
                ))}
                <div className={styles.footer}>
                    <Button onClick={handleAddAlltoBag} disabled={loading} fullWidth className={styles.btnSigin}>
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
