/* eslint-disable radix */
/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import Link from 'next/link';
import { getCartId } from '@helpers/cartId';
import { useMutation } from '@apollo/react-hooks';
import { GraphCustomer } from '@services/graphql';
import TagManager from 'react-gtm-module';
import { storeConfigNameCokie } from '@config';
import cookies from 'js-cookie';
import Item from './item';
import CrossSell from './crosssell';
import useStyles from '../style';
import EditDrawer from './editDrawer';
import CheckoutDrawer from './checkoutBox';
import { getCartData } from '../services';
import SkeletonCart from './skeleton';
import * as Schema from '../services/schema';

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
    const { t, token, isLogin } = props;
    const styles = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    let cartId = '';

    let dataCart = {
        id: null,
        total_quantity: 0,
        applied_coupons: null,
        prices: {},
        items: [],
    };
    let loadingCart = true;
    let crosssell = [];

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = (item) => {
        setEditItem(item);
        setOpenEditDrawer(!openEditDrawer);
    };

    // delete item from cart
    const [actDeleteItem] = useMutation(Schema.deleteCartitem);
    const [actUpdateItem] = useMutation(Schema.updateCartitem);

    // delete items
    const deleteItem = (itemProps) => {
        const dataLayer = {
            event: 'removeFromCart',
            eventLabel: itemProps.product.name,
            label: itemProps.product.name,
            ecommerce: {
                currencyCode: itemProps.prices.price.currency || 'IDR',
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
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemProps.id),
            },
            context: {
                request: 'internal',
            },
            refetchQueries: [
                {
                    query: Schema.getCart,
                    variables: { cartId },
                    fetchPolicy: 'cache-and-network',
                    context: {
                        request: 'internal',
                    },
                },
            ],
        }).then(() => {
            toggleEditMode();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('cart:deleteSuccess'),
                variant: 'success',
            });
        }).catch((e) => {
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
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemData.cart_item_id),
                quantity: itemData.quantity,
            },
            context: {
                request: 'internal',
            },
            refetchQueries: [
                {
                    query: Schema.getCart,
                    variables: { cartId },
                    context: {
                        request: 'internal',
                    },
                    fetchPolicy: 'cache-and-network',
                },
            ],
        }).then(() => {
            toggleEditMode();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('cart:updateSuccess'),
                variant: 'success',
            });
        }).catch((e) => {
            toggleEditMode();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message.split(':')[1] || t('cart:updateFailed'),
                variant: 'error',
            });
        });
    };
    let storeConfig = {};
    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (cartId) {
            const { loading, data } = getCartData(token, cartId);
            loadingCart = loading;
            if (!loading && data && data.cart) {
                dataCart = data.cart;
            }
        } else {
            loadingCart = false;
        }
        storeConfig = cookies.getJSON(storeConfigNameCokie);
    }
    useEffect(() => {
        if (dataCart.items.length > 0) {
            const crosssellData = getCrossSellProduct(dataCart.items);
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                ecommerce: {
                    currency: storeConfig.base_currency_code || 'IDR',
                    impressions: crosssellData.map((product, index) => ({
                        name: product.name,
                        id: product.sku,
                        category: product.categories[0].name || '',
                        price: product.price_range.minimum_price.regular_price.value,
                        list: 'Crossel Products',
                        position: index + 1,
                    })),
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'cart',
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [dataCart]);
    // add to wishlist
    const [addWishlist] = GraphCustomer.addWishlist();
    const handleFeed = (itemProps) => {
        if (isLogin && isLogin === 1) {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: itemProps.product.name,
                    label: itemProps.product.name,
                    ecommerce: {
                        currencyCode: itemProps.prices.price.currency || 'IDR',
                        add: {
                            products: [{
                                name: itemProps.product.name,
                                id: itemProps.product.sku,
                                price: itemProps.prices.price.value || 0,
                                category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                list: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                dimensions4: itemProps.product.stock_status,
                            }],
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
                    await window.toastMessage({ open: true, variant: 'success', text: t('wishlist:addSuccess') });
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('wishlist:addFailed'),
                    });
                    window.backdropLoader(false);
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('wishlist:addWithoutLogin'),
            });
        }
    };

    if (loadingCart) {
        return <SkeletonCart />;
    }

    crosssell = getCrossSellProduct(dataCart.items);

    if (dataCart.id && dataCart.items.length > 0) {
        return (
            <>
                <div className={styles.container}>
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarCounter}>
                            <Typography variant="p" type="regular">
                                <span>{dataCart.total_quantity}</span>
                                {' '}
                                {t('cart:counter:text')}
                            </Typography>
                        </div>
                        <div className={styles.toolbarActions}>
                            <Button variant="outlined" className={styles.toolbarButton} onClick={toggleEditMode}>
                                {editMode ? <>{t('common:button:save')}</> : <>{t('common:button:edit')}</>}
                            </Button>
                        </div>
                    </div>
                    <div className={styles.items}>
                        {dataCart.items.map((item, idx) => (
                            <Item
                                key={idx}
                                editMode={editMode}
                                toggleEditDrawer={() => toggleEditDrawer({
                                    id: item.id,
                                    quantity: item.quantity,
                                    product_name: item.product.name,
                                })}
                                deleteItem={deleteItem}
                                {...props}
                                {...item}
                                handleFeed={handleFeed}
                            />
                        ))}
                    </div>
                </div>
                <CrossSell {...props} editMode={editMode} data={crosssell} />
                {editItem.id ? (
                    <EditDrawer open={openEditDrawer} toggleOpen={toggleEditDrawer} updateItem={updateItem} {...props} {...editItem} />
                ) : null}

                <CheckoutDrawer editMode={editMode} t={t} data={dataCart} />
            </>
        );
    }
    return (
        <div className={styles.container} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="span" type="regular" align="center">
                <span className={styles.emptyCart}>{t('cart:empty:text')}</span>
            </Typography>
            <Link href="/">
                <a>
                    <Button className={styles.toolbarButton} customRootStyle={{ width: 'fit-content' }}>
                        {t('common:button:continueShopping')}
                    </Button>
                </a>
            </Link>
        </div>
    );
};

export default Cart;
