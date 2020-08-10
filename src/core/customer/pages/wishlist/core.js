/* eslint-disable no-nested-ternary */
import { getCartId, setCartId } from '@helpers/cartId';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import Layout from '@layout';
import { getCartIdUser } from '../../services/graphql/schema';
import { addSimpleProductsToCart, getCustomer, removeWishlist as gqlremoveWishlist } from '../../services/graphql';

const Wishlist = (props) => {
    let wishlist = [];
    const {
        Skeleton, Content, t, isLogin, pageConfig,
    } = props;

    const config = {
        title: t('wishlist:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('wishlist:pageTitle'),
        bottomNav: false,
    };
    const [addToCart] = addSimpleProductsToCart();
    const [removeWishlist] = gqlremoveWishlist();
    const {
        data, loading, error, refetch,
    } = getCustomer();
    const cartUser = useQuery(getCartIdUser, {
        context: {
            request: 'internal',
        },
        skip: !isLogin || typeof window === 'undefined',
    });

    if (!data || loading || error) return <Layout pageConfig={pageConfig || config} {...props}><Skeleton /></Layout>;
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
        if (__typename === 'ConfigurableProduct') {
            Router.push('/[...slug]', `/${url_key}`);
        } else {
            window.backdropLoader(true);
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
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'success',
                            text: t('wishlist:successAddCart'),
                        });
                        refetch();
                    });
                })
                .catch(async (e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('wishlist:failedAddCart'),
                    });
                });
        }
    };

    const handleRemove = ({ wishlistItemId }) => {
        window.backdropLoader(true);
        removeWishlist({
            variables: {
                wishlistItemId,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('wishlist:removeSuccess'),
                });
                refetch();
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || t('wishlist:removeFailed'),
                });
            });
    };

    const handleAddAlltoBag = async () => {
        window.backdropLoader(true);
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
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: errorCart[0]
                    ? totalSucces > 0
                        // eslint-disable-next-line max-len
                        ? `${t('wishlist:addPartToBagSuccess').split('$'[0])} ${totalSucces} ${t('wishlist:addPartToBagSuccess').split('$'[1])}`
                        : errorCart[1] || t('product:failedAddCart')
                    : t('wishlist:addAllToBagSuccess'),
                variant: errorCart[0] ? 'error' : 'success',
            });
        }, 3000);
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                t={t}
                wishlist={wishlist}
                refetch={refetch}
                handleRemove={handleRemove}
                handleToCart={handleToCart}
                handleAddAlltoBag={handleAddAlltoBag}
                loading={loading}
            />
        </Layout>
    );
};

export default Wishlist;
