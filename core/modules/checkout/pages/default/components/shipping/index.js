import gqlService from '@core_modules/checkout/services/graphql';
import { getCartId } from '@helper_cartid';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import React from 'react';
import TagManager from 'react-gtm-module';

const Shipping = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        updateFormik,
        handleOpenMessage,
        storeConfig,
        isOnlyVirtualProductOnCart,
        ShippingView,
        checkoutTokenState,
        setCheckoutTokenState,
        setLoadingSellerInfo,
        loadingSellerInfo,
        currencyCache,
    } = props;

    const { loading, data, selected } = checkout;
    const [setShippingMethod] = gqlService.setShippingMethod();
    const [setShippingMethodMultiseller] = gqlService.setShippingMethodMultiseller();
    const { data: shippingMethodList } = gqlService.getCheckoutConfigurations();

    const handleShipping = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            if (storeConfig.enable_oms_multiseller === '1') {
                const [carrier_code, method_code, seller_id] = val.split('_');
                let state = { ...checkout };
                const setBySellerId = state.selected.shipping.find((item) => item.seller_id === seller_id);
                if (setBySellerId) {
                    state.selected.shipping.find((item) => item.seller_id === seller_id).name.carrier_code = carrier_code;
                    state.selected.shipping.find((item) => item.seller_id === seller_id).name.method_code = method_code;
                }
                setCheckout(state);
                const inputShippingMethod = [];
                const GTMShippingMethod = [];

                const checkEmpty = state.selected.shipping.find((item) => item.name.carrier_code === null);
                const cartIdCookie = getCartId();
                const checkoutShippingMethodLocalStorage = getLocalStorage('checkout_shipping_method');

                if (!checkEmpty) {
                    state.selected.shipping.forEach((selectedShipping) => {
                        inputShippingMethod.push({
                            carrier_code: selectedShipping.name.carrier_code,
                            method_code: selectedShipping.name.method_code,
                            seller_id: selectedShipping.seller_id,
                        });
                        const sellerShipping = data.shippingMethods.filter((item) => item.seller_id === selectedShipping.seller_id);
                        const sellerSelectedShipping = sellerShipping[0].available_shipping_methods.filter(
                            (item) => item.method_code === selectedShipping.name.method_code,
                        );
                        GTMShippingMethod.push({
                            seller_id: selectedShipping.seller_id,
                            ...sellerSelectedShipping[0],
                        });
                    });
                }

                let updatedCart = {};

                if (!checkEmpty) {
                    if (checkoutShippingMethodLocalStorage && checkoutShippingMethodLocalStorage.length > 0) {
                        const matchData = checkoutShippingMethodLocalStorage.find((item) => item.cartId === cartIdCookie);
                        if (matchData) {
                            const tempArray = checkoutShippingMethodLocalStorage.map(({ cartId, data: dataShipping }) => {
                                const tempShippingData = dataShipping.map((item, index) => ({
                                    ...item,
                                    ...state.selected.shipping[index],
                                }));
                                if (cartId === cartIdCookie) {
                                    return {
                                        cartId,
                                        data: tempShippingData,
                                    };
                                }
                                return {
                                    cartId,
                                    data: dataShipping,
                                };
                            });
                            setLocalStorage('checkout_shipping_method', tempArray);
                        } else {
                            const tempArray = [];
                            tempArray.push({
                                cartId: cartIdCookie,
                                data: state.selected.shipping,
                            });
                            setLocalStorage('checkout_shipping_method', tempArray);
                        }
                    } else {
                        const tempArray = [];
                        tempArray.push({
                            cartId: cartIdCookie,
                            data: state.selected.shipping,
                        });
                        setLocalStorage('checkout_shipping_method', tempArray);
                    }
                }

                if (!checkEmpty) {
                    state = {
                        ...checkout,
                        loading: {
                            ...checkout.loading,
                            all: false,
                            shipping: false,
                            extraFee: true,
                            order: true,
                        },
                    };
                    setCheckout(state);
                    await setShippingMethodMultiseller({
                        variables: {
                            cartId: cart.id,
                            shippingMethodInput: inputShippingMethod,
                        },
                    }).then((res) => {
                        updatedCart = res;
                    }).catch((err) => {
                        updatedCart = err;
                    });

                    state = {
                        ...checkout,
                        loading: {
                            ...checkout.loading,
                            all: false,
                            shipping: false,
                            payment: false,
                            extraFee: false,
                            order: false,
                        },
                    };
                    setCheckout(state);

                    // eslint-disable-next-line max-len
                    if (updatedCart && updatedCart.data && updatedCart.data.setShippingMethodsOnCart && updatedCart.data.setShippingMethodsOnCart.cart) {
                        updatedCart = {
                            ...checkout.data.cart,
                            ...updatedCart.data.setShippingMethodsOnCart.cart,
                        };
                        updateFormik(updatedCart);

                        const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
                            ...method,
                            label: method.title,
                            value: method.code,
                            image: null,
                        }));

                        state = { ...checkout };
                        state.data.paymentMethod = paymentMethod;
                        state.data.cart = updatedCart;
                        setCheckout(state);
                        let selectedShipping = '';
                        // eslint-disable-next-line array-callback-return
                        GTMShippingMethod.map((item, index) => {
                            if (index !== GTMShippingMethod.length - 1) selectedShipping += `${item.label}| `;
                            else selectedShipping += `${item.label}`;
                        });
                        // GTM UA dataLayer
                        const dataLayer = {
                            event: 'checkout',
                            ecommerce: {
                                checkout: {
                                    actionField: { step: 2, option: selectedShipping, action: 'checkout' },
                                    products: cart.items.map(({ quantity, product, prices }) => ({
                                        name: product.name,
                                        id: product.sku,
                                        price: JSON.stringify(prices.price.value),
                                        category: product.categories.length > 0 ? product.categories[0].name : '',
                                        list: product.categories.length > 0 ? product.categories[0].name : '',
                                        quantity: JSON.stringify(quantity),
                                        dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                                        dimension5: '',
                                        dimension6: '',
                                        dimension7: prices.discount ? 'YES' : 'NO',
                                    })),
                                },
                                currencyCode: storeConfig.base_currency_code || 'IDR',
                            },
                        };
                        const dataLayerOption = {
                            event: 'checkoutOption',
                            ecommerce: {
                                currencyCode: storeConfig.base_currency_code || 'IDR',
                                checkout_option: {
                                    actionField: { step: 2, option: selectedShipping, action: 'checkout_option' },
                                },
                            },
                        };
                        // GA 4 dataLayer
                        const dataLayerOpt = {
                            event: 'add_shipping_info',
                            ecommerce: {
                                shipping_tier: selectedShipping,
                                items: [
                                    cart.items.map(({ quantity, product, prices }) => ({
                                        currency: storeConfig.base_currency_code || 'IDR',
                                        item_name: product.name,
                                        item_id: product.sku,
                                        price: JSON.stringify(prices.price.value),
                                        item_category: product.categories.length > 0 ? product.categories[0].name : '',
                                        item_list_name: product.categories.length > 0 ? product.categories[0].name : '',
                                        quantity: JSON.stringify(quantity),
                                        item_stock_status: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                                        item_sale_product: '',
                                        item_reviews_count: '',
                                        item_reviews_score: '',
                                    })),
                                ],
                            },
                        };
                        TagManager.dataLayer({
                            dataLayer,
                        });
                        TagManager.dataLayer({
                            dataLayer: dataLayerOption,
                        });
                        TagManager.dataLayer({
                            dataLayer: dataLayerOpt,
                        });
                    } else {
                        state.selected.shipping = null;
                        if (updatedCart.message.includes('Token is wrong.')) {
                            setCheckoutTokenState(!checkoutTokenState);
                        } else {
                            handleOpenMessage({
                                variant: 'error',
                                text: t('checkout:message:problemConnection'),
                            });
                        }
                    }
                }
            } else {
                const [carrier_code, method_code] = val.split('_');
                let state = {
                    ...checkout,
                    loading: {
                        ...checkout.loading,
                        all: false,
                        shipping: false,
                        extraFee: true,
                        order: true,
                    },
                };
                state.selected.shipping = val;
                setCheckout(state);

                let updatedCart = {};
                await setShippingMethod({
                    variables: {
                        cartId: cart.id,
                        carrierCode: carrier_code,
                        methodCode: method_code,
                    },
                }).then((res) => {
                    updatedCart = res;
                }).catch((err) => {
                    updatedCart = err;
                });

                state = {
                    ...checkout,
                    loading: {
                        ...checkout.loading,
                        all: false,
                        shipping: false,
                        payment: false,
                        extraFee: false,
                        order: false,
                    },
                };
                setCheckout(state);

                if (updatedCart && updatedCart.data && updatedCart.data.setShippingMethodsOnCart && updatedCart.data.setShippingMethodsOnCart.cart) {
                    updatedCart = {
                        ...checkout.data.cart,
                        ...updatedCart.data.setShippingMethodsOnCart.cart,
                    };
                    updateFormik(updatedCart);

                    const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
                        ...method,
                        label: method.title,
                        value: method.code,
                        image: null,
                    }));

                    state = { ...checkout };
                    state.data.paymentMethod = paymentMethod;
                    state.data.cart = updatedCart;
                    state.newupdate = true;
                    setCheckout(state);
                    const selectedShipping = data.shippingMethods.filter((item) => item.method_code === method_code);

                    // GTM UA dataLayer
                    const dataLayer = {
                        event: 'checkout',
                        ecommerce: {
                            checkout: {
                                actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout' },
                                products: cart.items.map(({ quantity, product, prices }) => ({
                                    name: product.name,
                                    id: product.sku,
                                    price: JSON.stringify(prices.price.value),
                                    category: product.categories.length > 0 ? product.categories[0].name : '',
                                    list: product.categories.length > 0 ? product.categories[0].name : '',
                                    quantity: JSON.stringify(quantity),
                                    dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                                    dimension5: '',
                                    dimension6: '',
                                    dimension7: prices.discount ? 'YES' : 'NO',
                                })),
                            },
                            currencyCode: storeConfig.base_currency_code || 'IDR',
                        },
                    };
                    const dataLayerOption = {
                        event: 'checkoutOption',
                        ecommerce: {
                            currencyCode: storeConfig.base_currency_code || 'IDR',
                            checkout_option: {
                                actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout_option' },
                            },
                        },
                    };
                    // GA 4 dataLayer
                    const dataLayerOpt = {
                        event: 'add_shipping_info',
                        ecommerce: {
                            shipping_tier: selectedShipping[0].label,
                            items: [
                                cart.items.map(({ quantity, product, prices }) => ({
                                    currency: storeConfig.base_currency_code || 'IDR',
                                    item_name: product.name,
                                    item_id: product.sku,
                                    price: JSON.stringify(prices.price.value),
                                    item_category: product.categories.length > 0 ? product.categories[0].name : '',
                                    item_list_name: product.categories.length > 0 ? product.categories[0].name : '',
                                    quantity: JSON.stringify(quantity),
                                    item_stock_status: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                                    item_sale_product: '',
                                    item_reviews_count: '',
                                    item_reviews_score: '',
                                })),
                            ],
                        },
                    };
                    TagManager.dataLayer({
                        dataLayer,
                    });
                    TagManager.dataLayer({
                        dataLayer: dataLayerOption,
                    });
                    TagManager.dataLayer({
                        dataLayer: dataLayerOpt,
                    });
                } else {
                    state.selected.shipping = null;
                    if (updatedCart.message.includes('Token is wrong.')) {
                        setCheckoutTokenState(!checkoutTokenState);
                    } else {
                        handleOpenMessage({
                            variant: 'error',
                            text: t('checkout:message:problemConnection'),
                        });
                    }
                }
            }
        }
    };

    return (
        <ShippingView
            checkout={checkout}
            setCheckout={setCheckout}
            storeConfig={storeConfig}
            t={t}
            shippingMethodList={shippingMethodList}
            handleShipping={handleShipping}
            loading={loading}
            selected={selected}
            data={data}
            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
            setLoadingSellerInfo={setLoadingSellerInfo}
            loadingSellerInfo={loadingSellerInfo}
            currencyCache={currencyCache}
        />
    );
};

export default Shipping;
