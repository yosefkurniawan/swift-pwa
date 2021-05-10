/* eslint-disable radix */
/* eslint-disable no-plusplus */
import { useState } from 'react';
import { getCartId, setCartId } from '@helper_cartid';
import { useMutation, useLazyQuery } from '@apollo/client';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { localTotalCart } from '@services/graphql/schema/local';
import { addWishlist as mutationWishlist, reOrder as mutationReOrder } from '@core_modules/cart/services/graphql';
import * as Schema from '@core_modules/cart/services/graphql/schema';

const getCrossSellProduct = (items) => {
    let crosssell = [];
    for (let index = 0; index < items.length; index++) {
        const data = items[index].product.crosssell_products.map((product) => ({
            ...product,
            categories: items[index].product.categories,
        }));
        crosssell = crosssell.concat(data);
    }
    return crosssell;
};

const Cart = (props) => {
    const {
        t, token, isLogin, EmptyView, SkeletonView, pageConfig, Content, storeConfig, ...other
    } = props;

    const router = useRouter();
    const { paymentFailed, orderId } = router.query;
    const dataCart = {
        id: null,
        total_quantity: 0,
        applied_coupons: null,
        prices: {},
        items: [],
    };
    const [cart, setCart] = React.useState(dataCart);
    const [errorCart, setErrorCart] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [loadingCart, setLoadingCart] = useState(true);
    const config = {
        title: t('cart:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('cart:pageTitle'),
        headerBackIcon: 'close', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'cart',
    };
    let crosssell = [];

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = (item) => {
        setEditItem(item);
        setOpenEditDrawer(!openEditDrawer);
    };

    // delete item from cart
    const [actDeleteItem, deleteData] = useMutation(Schema.deleteCartItemOnPage);
    const [actUpdateItem, update] = useMutation(Schema.updateCartitem);

    // reorder
    const [reOrder, responseReorder] = mutationReOrder();

    // getCartDataLazzy
    const [getCart, responseCart] = useLazyQuery(Schema.getCart, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    });

    React.useEffect(() => {
        if (paymentFailed && orderId) {
            reOrder({
                variables: {
                    order_id: orderId,
                },
            });
        } else {
            const cartId = getCartId();
            if (cartId) {
                if (getCart && !responseCart.called) {
                    getCart({
                        variables: {
                            cartId,
                        },
                    });
                }
            } else {
                setLoadingCart(false);
            }
        }
    }, []);

    React.useEffect(() => {
        if (responseReorder && responseReorder.data && responseReorder.data.reorder && responseReorder.data.reorder.cart_id) {
            const { cart_id } = responseReorder.data.reorder;
            if (typeof window !== 'undefined') {
                if (cart_id) {
                    setCartId(cart_id);
                    if (paymentFailed && orderId) {
                        setTimeout(() => {
                            router.push('/checkout/cart');
                        }, 1000);
                    }
                    if (getCart && !responseCart.called) {
                        getCart({
                            variables: {
                                cartId: cart_id,
                            },
                        });
                    }
                }
            }
        }
    }, [responseReorder]);

    React.useEffect(() => {
        if (responseCart.loading) setLoadingCart(true);
        if (responseCart && responseCart.data && responseCart.data.cart) {
            const itemsCart = responseCart.data.cart.items.filter((item) => item !== null);
            const carts = {
                ...responseCart.data.cart,
                items: itemsCart,
            };
            setCart(carts);
            if (responseCart.client && responseCart.data.cart.total_quantity && responseCart.data.cart.total_quantity > 0) {
                responseCart.client.writeQuery({
                    query: localTotalCart,
                    data: { totalCart: responseCart.data.cart.total_quantity },
                });
            }
            setLoadingCart(false);
        }

        if (responseCart.error) {
            const errorList = [];
            if (responseCart.error && responseCart.error.graphQLErrors
                && responseCart.error.graphQLErrors.length > 0) {
                for (let idx = 0; idx < responseCart.error.graphQLErrors.length; idx += 1) {
                    const { message } = responseCart.error.graphQLErrors[idx];
                    const regexp = new RegExp(/stock/i);
                    if (message && regexp.test(message)) {
                        errorList.push(message);
                    }
                }
            }
            setErrorCart(errorList);
            setLoadingCart(false);
        }
    }, [responseCart]);

    // React.useMemo(() => {
    //     if (!loadingCart && tmpData && tmpData.id) {
    //         setCart({ ...tmpData });
    //     }
    // }, [loadingCart]);

    // delete items
    const deleteItem = (itemProps) => {
        const dataLayer = {
            event: 'removeFromCart',
            eventLabel: itemProps.product.name,
            label: itemProps.product.name,
            ecommerce: {
                currencyCode: itemProps.prices.price.currency || storeConfig.base_currency_code,
                remove: {
                    cartItem: itemProps.id,
                    quantity: itemProps.quantity,
                    product: {
                        name: itemProps.product.name,
                        id: itemProps.product.sku,
                        price: itemProps.prices.price.value || 0,
                        dimensions4: itemProps.product.stock_status || '',
                    },
                },
            },
        };

        TagManager.dataLayer({ dataLayer });
        window.backdropLoader(true);

        const cartId = getCartId();
        setLoadingCart(true);
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemProps.id),
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                setLoadingCart(false);
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:deleteSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                setLoadingCart(false);
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('cart:deleteFailed'),
                    variant: 'error',
                });
            });
    };

    // update items
    const updateItem = (itemData) => {
        window.backdropLoader(true);

        const cartId = getCartId();
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemData.cart_item_id),
                quantity: itemData.quantity,
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:updateSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('cart:updateFailed'),
                    variant: 'error',
                });
            });
    };

    React.useMemo(() => {
        if (!update.loading && update.data && update.data.updateCartItems) {
            setCart({ ...update.data.updateCartItems.cart });
        }
    }, [update.loading]);

    React.useMemo(() => {
        if (!deleteData.loading && deleteData.data && deleteData.data.removeItemFromCart) {
            setCart({ ...deleteData.data.removeItemFromCart.cart });
        }
    }, [deleteData.loading]);

    React.useMemo(() => {
        if (cart.items.length > 0) {
            const crosssellData = getCrossSellProduct(cart.items);
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                ecommerce: {
                    currency: storeConfig && storeConfig.base_currency_code ? storeConfig.base_currency_code : 'IDR',
                    impressions: crosssellData.map((product, index) => {
                        const category = product.categories && product.categories.length > 0 && product.categories[0].name;
                        return {
                            name: product.name,
                            id: product.sku,
                            category: category || '',
                            price: product.price_range.minimum_price.regular_price.value,
                            list: 'Crossel Products',
                            position: index + 1,
                        };
                    }),
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'cart',
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [cart.items.length]);
    // add to wishlist
    const [addWishlist] = mutationWishlist();
    const handleFeed = (itemProps) => {
        if (isLogin && isLogin === 1) {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: itemProps.product.name,
                    label: itemProps.product.name,
                    ecommerce: {
                        currencyCode: itemProps.prices.price.currency,
                        add: {
                            products: [
                                {
                                    name: itemProps.product.name,
                                    id: itemProps.product.sku,
                                    price: itemProps.prices.price.value || 0,
                                    category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    list: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    dimensions4: itemProps.product.stock_status,
                                },
                            ],
                        },
                    },
                },
            });
            window.backdropLoader(true);
            addWishlist({
                variables: {
                    productId: parseInt(itemProps.product.id),
                },
            })
                .then(async () => {
                    deleteItem(itemProps);
                    await window.toastMessage({ open: true, variant: 'success', text: t('cart:addWishlistSuccess') });
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('cart:addWishlistFailed'),
                    });
                    window.backdropLoader(false);
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('cart:addWishlistWithoutLogin'),
            });
        }
    };

    if (loadingCart) {
        return (
            <Layout pageConfig={config || pageConfig} {...props}>
                <SkeletonView />
            </Layout>
        );
    }

    crosssell = getCrossSellProduct(cart.items);
    const globalCurrency = storeConfig.default_display_currency_code;

    if (!loadingCart && cart.items.length < 1) {
        return (
            <Layout pageConfig={config || pageConfig} {...props}>
                <EmptyView t={t} />
            </Layout>
        );
    }

    const contentProps = {
        dataCart: cart,
        t,
        handleFeed,
        toggleEditMode,
        editMode,
        deleteItem,
        toggleEditDrawer,
        crosssell,
        editItem,
        openEditDrawer,
        updateItem,
        storeConfig,
        globalCurrency,
        errorCart,
    };
    return (
        <Layout pageConfig={config || pageConfig} {...props}>
            <Content {...other} {...contentProps} />
        </Layout>
    );
};

export default Cart;
