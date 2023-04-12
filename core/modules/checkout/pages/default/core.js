/* eslint-disable indent */
/* eslint-disable arrow-body-style */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React from 'react';
import Toast from '@common_toast';
import gqlService from '@core_modules/checkout/services/graphql';
import Layout from '@layout';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Router from 'next/router';
import TagManager from 'react-gtm-module';
import { useApolloClient, useReactiveVar } from '@apollo/client';
import { modules, nameCheckoutState } from '@config';
import { getCartCallbackUrl, getLoginCallbackUrl, getSuccessCallbackUrl } from '@core_modules/checkout/helpers/config';
import { getCartId } from '@helpers/cartId';
import { getStoreHost } from '@helpers/config';
import { getCheckoutData, removeCheckoutData } from '@helpers/cookies';
import { formatPrice } from '@helper_currency';
import { setLocalStorage } from '@helper_localstorage';
import { getAppEnv } from '@root/core/helpers/env';
import { updatePwaCheckoutLog } from '@services/graphql/repository/log';
import { useFormik } from 'formik';
import { currencyVar } from '@root/core/services/graphql/cache';
import * as Schema from '@core_modules/checkout/services/graphql/schema';
import * as Yup from 'yup';

function equalTo(ref, msg) {
    return this.test({
        name: 'equalTo',
        exclusive: false,
        message: msg || 'Error not same data',
        params: {
            reference: ref.path,
        },
        test(value) {
            return value === this.resolve(ref);
        },
    });
}

const Checkout = (props) => {
    const {
        t, storeConfig, pageConfig, Content, cartId: propsCardId,
    } = props;
    const config = {
        successRedirect: {
            link: getSuccessCallbackUrl(),
            orderId: true,
        },
        cartRedirect: {
            link: getCartCallbackUrl(),
        },
        loginRedirect: {
            link: getLoginCallbackUrl({ errorGuest: false }),
        },
    };
    const [actUpdatePwaCheckoutLog] = updatePwaCheckoutLog();
    const apolloClient = useApolloClient();

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);
    const appEnv = getAppEnv();

    let { isLogin } = props;
    let pwaCheckoutState = null;
    let urlRedirect = modules.checkout.checkoutOnly ? getStoreHost(appEnv) : '/checkout/cart';

    const [cartId, setCartId] = React.useState(propsCardId);
    const [setCheckoutSession] = gqlService.setCheckoutSession();
    const [checkoutTokenState, setCheckoutTokenState] = React.useState();
    const [loadingSellerInfo, setLoadingSellerInfo] = React.useState(storeConfig.enable_oms_multiseller === '1');
    const [amountSeller, setAmountSeller] = React.useState(0);
    const [currentIndexSeller, setCurrentIndexSeller] = React.useState(0);
    const [sellerInfoState, setSellerInfoState] = React.useState([]);
    const timeoutCart = React.useRef(null);
    const timeoutWindowLocation = React.useRef(null);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartid = getCartId();
            isLogin = Cookies.get('isLogin');
            const cdt = getCheckoutData();
            if (!cartid) {
                Router.push(urlRedirect);
            }
            if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                pwaCheckoutState = encodeURIComponent(Cookies.get(nameCheckoutState));
            }
            if (cdt) {
                removeCheckoutData();
            }
            setCartId(cartid);
        }

        return () => {
            clearTimeout(timeoutCart.current);
            clearTimeout(timeoutWindowLocation.current);
        };
    }, []);

    React.useEffect(() => {
        if (cartId) {
            setCheckoutSession({
                variables: {
                    cartId: cartId || propsCardId,
                },
            })
                .then(async (result) => { })
                .catch((e) => {
                    // eslint-disable-next-line no-console
                    console.log(e);
                });
        }
    }, [cartId, propsCardId, setCheckoutSession]);

    // const { snap_is_production, snap_client_key, allow_guest_checkout } = storeConfig;
    const { snap_is_production, allow_guest_checkout } = storeConfig;
    if (storeConfig && !allow_guest_checkout && !isLogin) {
        urlRedirect = getLoginCallbackUrl({ errorGuest: true });
        if (typeof window !== 'undefined') {
            Router.push(urlRedirect);
        }
    }

    const configPage = {
        title: t('checkout:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('checkout:pageTitle'),
        bottomNav: false,
        pageType: 'checkout',
    };

    const url = snap_is_production === '0' ? modules.checkout.snapUrl.dev : modules.checkout.snapUrl.prod;

    const [checkout, setCheckout] = React.useState({
        order_id: '',
        newupdate: false,
        data: {
            errorItems: false,
            cart: null,
            customer: null,
            shippingMethods: [],
            paymentMethod: [],
            isGuest: false,
            isCouponAppliedToCart: false,
            order_comment: null,
            rewardPoints: {},
            credit: 0,
            message: {
                open: false,
                text: 'default',
                variant: '',
            },
            defaultAddress: null,
            summary: {
                prices: null,
                items: null,
                shipping_addresses: null,
            },
            seller: [],
        },
        selected: {
            address: null,
            shipping: {
                name: { carrier_code: null, method_code: null },
                price: null,
                original_price: null,
            },
            payment: null,
            purchaseOrderNumber: null,
            billing: null,
            delivery: 'home',
        },
        loading: {
            all: true,
            addresses: false,
            shipping: false,
            payment: false,
            purchaseOrderNumber: false,
            billing: false,
            order: false,
            coupon: false,
            storeCredit: false,
            giftCard: false,
            extraFee: false,
            paypal: false,
            confirmation: false,
            totalPrice: false,
        },
        status: {
            addresses: false,
            openAddressDialog: false,
            backdrop: false,
            purchaseOrderApply: false,
        },
        pickupInformation: {},
        selectStore: {},
        pickup_location_code: null,
        error: {
            pickupInformation: false,
            selectStore: false,
            shippingAddress: false,
        },
        disabled: {
            address: false,
        },
        confirmation: false,
    });

    const [isError, setError] = React.useState(false);

    // config paypal
    const [initialOptionPaypal, setInitialOptionPaypal] = React.useState({
        'client-id': storeConfig?.paypal_key.client_id,
        currency: storeConfig?.base_currency_code,
        intent: storeConfig?.paypal_key.intent,
        'data-order-id': '',
        // debug: modules.paypal.debug,
        'disable-funding': storeConfig?.paypal_key.disable_funding,
        'merchant-id': storeConfig?.pwa?.paypal_merchant_id,
    });

    const [tokenData, setTokenData] = React.useState({});

    // start init graphql
    const [getCustomer, manageCustomer] = gqlService.getCustomer();
    const [getCart, { data: dataCart, error: errorCart, refetch: refetchDataCart }] = gqlService.getCart();
    const [getItemCart, { data: itemCart, error: errorItem, refetch: refetchItemCart }] = gqlService.getItemCart();
    const [getPrice, { data: itemPrice, loading: priceLoading }] = gqlService.getPrice();
    const [getRewardPoint, rewardPoint] = gqlService.getRewardPoint();
    const [getCustomerAddress, addressCustomer] = gqlService.getAddressCustomer();
    const [setShippingAddressByInput] = gqlService.initiateShippingAddressMultiseller();
    const [setBillingAddressByInput] = gqlService.initiateBillingAddressMultiseller();
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => { } });
    const [getPaypalToken, paypalTokenData] = gqlService.createPaypalExpressToken();
    // end init graphql

    /**
     * check on shipping cart item only virtual product
     * @return {bool}
     */
    const isOnlyVirtualProductOnCart = React.useMemo(() => {
        const { cart } = checkout.data;
        const cartItems = cart?.items;

        if (cartItems) {
            const cartItemsFilter = cartItems.filter((item) => {
                const { __typename } = item.product;
                let isVirtualAwGc = !!(__typename === 'AwGiftCardProduct'
                && item.product.aw_gc_type === 'VIRTUAL');
                return __typename !== 'VirtualProduct' && __typename !== 'DownloadableProduct' && !isVirtualAwGc;
            });

            /**
             * If cart has items of type VirtualProduct, DownloadableProduct, and AwGiftCardProduct,
             * It means cart contains only virtual product(s).
             */
            const isAllVirtual = cartItemsFilter.length === 0;
            if (isAllVirtual) return true;
        }
        return false;
    }, [checkout?.data?.cart]);

    Yup.addMethod(Yup.string, 'equalTo', equalTo);

    const CheckoutSchema = Yup.object().shape({
        confirmation: checkout.confirmation ? '' : Yup.bool().oneOf([true], 'Accept Ts & Cs is required'),
        email: checkout.data.isGuest ? Yup.string().nullable().email(t('validate:email:wrong')).required(t('validate:email.required')) : null,
        payment: Yup.string().nullable().required(t('validate:required')),
        oldEmail: checkout.data.isGuest ? Yup.string().equalTo(Yup.ref('email')) : null,
        address: isOnlyVirtualProductOnCart || checkout.selectStore.id !== null ? null : Yup.object().nullable().required(t('validate:required')),
        billing: checkout.selected.delivery === 'home' && Yup.object().nullable().required(t('validate:required')),
        shipping: isOnlyVirtualProductOnCart
            ? null
            : checkout.selected.delivery === 'home' && Yup.object().nullable().required(t('validate:required')),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            oldEmail: '',
            coupon: '',
            orderComment: '',
            giftCard: '',
            address: null,
            shipping: null,
            payment: null,
            billing: null,
            confirmation: false,
        },
        validationSchema: CheckoutSchema,
        onSubmit: () => { },
    });

    const updateFormik = (cart) => {
        const address = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses[0] : null;
        const shipping = address && address.selected_shipping_method;
        const { email } = cart;
        const payment = cart.selected_payment_method && cart.selected_payment_method.code;
        const billing = cart.billing_address;
        if (email && !formik.values.email) {
            formik.setFieldValue('email', email || '');
            formik.setFieldValue('oldEmail', email || '');
        }

        if (cart.applied_coupons) {
            const [coupon] = cart.applied_coupons;
            formik.setFieldValue('coupon', coupon.code);
        }

        formik.setFieldValue('address', address);
        formik.setFieldValue('shipping', shipping);
        formik.setFieldValue('payment', payment);
        formik.setFieldValue('billing', billing);
    };

    const updateAddressState = (result) => {
        const state = { ...checkout };
        const updatedCart = result.data.setBillingAddressOnCart.cart;
        if (isOnlyVirtualProductOnCart) {
            state.selected.billing = updatedCart?.billing_address;
            state.selected.address = updatedCart?.billing_address;
        } else {
            const [shippingAddress] = updatedCart.shipping_addresses;
            if (shippingAddress && state.data.isGuest) {
                state.selected.address = shippingAddress;
            }

            if (checkout.selected.delivery === 'home' && typeof shippingAddress.is_valid_city !== 'undefined') {
                state.error.shippingAddress = !shippingAddress.is_valid_city;
            }
        }
        state.loading.addresses = false;
        const mergeCart = {
            ...state.data.cart,
            ...updatedCart,
        };
        state.data.cart = mergeCart;

        if (refetchDataCart && typeof refetchDataCart() === 'function') {
            refetchDataCart();
        }
        if (refetchItemCart && typeof refetchItemCart() === 'function') {
            refetchItemCart();
        }
        setCheckout(state);

        updateFormik(mergeCart);
    };

    React.useEffect(() => {
        if (currentIndexSeller === amountSeller - 1 && sellerInfoState.length > 0) {
            const { cart } = dataCart;
            const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses : null;

            let cartItemBySeller = {};

            if (itemCart.cart.items.length > 0) {
                const unGroupedData = itemCart.cart.items;

                // eslint-disable-next-line no-shadow
                const groupData = unGroupedData.reduce((groupData, { id, quantity, pickup_item_store_info, prices, product, custom_seller, ...other }) => {
                    let item = groupData.find((p) => p.seller_id === custom_seller.seller_id);
                    if (!item) {
                        item = {
                            seller_id: custom_seller.seller_id ? custom_seller.seller_id : null,
                            seller_name: custom_seller.seller_name ? custom_seller.seller_name : 'Default Seller',
                            productList: [],
                            subtotal: {
                                currency: '',
                                value: 0,
                            },
                        };
                        groupData.push(item);
                    }
                    let child = item.productList.find((ch) => ch.name === product.name);
                    if (!child) {
                        child = {
                            id,
                            prices,
                            product,
                            quantity,
                            ...other,
                        };
                        item.productList.push(child);
                        item.subtotal.currency = prices.row_total_including_tax.currency;
                        item.subtotal.value += prices.row_total_including_tax.value;
                    }
                    return groupData;
                }, []);
                cartItemBySeller = groupData;
            }

            if (cartItemBySeller.length === shipping.length) {
                setLoadingSellerInfo(false);
            }
        }
    }, [currentIndexSeller, amountSeller, sellerInfoState, loadingSellerInfo]);

    const initData = () => {
        let { cart } = dataCart;
        const { errorItems, items } = itemCart.cart;
        const state = { ...checkout };
        cart = { ...cart, items };
        // check error items
        if (errorItems && errorItems.length > 0) {
            state.data.errorItems = true;
            setCheckout(state);
            const errorMessage = {
                variant: 'warning',
                text: errorItems[0],
                open: true,
            };
            window.toastMessage({
                ...errorMessage,
            });
            setTimeout(() => {
                Router.push('/checkout/cart');
            }, 3000);
        }
        // Check minimum order amount and enabled Start
        const minimumOrderEnabled = storeConfig.minimum_order_enable;
        const grandTotalValue = cart.prices.grand_total.value;
        const minimumOrderAmount = storeConfig.minimum_order_amount;
        if (minimumOrderEnabled && grandTotalValue < minimumOrderAmount) {
            const errorMessage = {
                variant: 'error',
                text: `Unable to place order: Minimum order amount is ${formatPrice(minimumOrderAmount, currencyCache)}`,
                open: true,
            };
            window.toastMessage({
                ...errorMessage,
            });
            timeoutCart.current = setTimeout(() => {
                Router.push('/checkout/cart');
            }, 3000);
        }
        // Check minimum order amount and enabled End

        if (cart && cart.items && cart.items.length === 0) {
            if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                actUpdatePwaCheckoutLog({
                    variables: {
                        cart_id: cart.id,
                        state: pwaCheckoutState,
                        status: 0,
                    },
                });
            }
            window.location.replace(config.cartRedirect && config.cartRedirect.link ? config.cartRedirect.link : '/checkout/cart');
        } else {
            cart.items.map((item) => {
                if (item.product && item.product.stock_status === 'OUT_OF_STOCK') {
                    if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                        actUpdatePwaCheckoutLog({
                            variables: {
                                cart_id: cart.id,
                                state: pwaCheckoutState,
                                status: 0,
                            },
                        });
                    }
                    window.location.replace(config.cartRedirect && config.cartRedirect.link ? config.cartRedirect.link : '/checkout/cart');
                }
                return null;
            });
        }

        let customer;
        let address;

        if (!state.data.isGuest && manageCustomer && manageCustomer.data && manageCustomer.data.customer && manageCustomer.data.customer.addresses) {
            customer = manageCustomer.data.customer;
            [address] = customer ? customer.addresses.filter((item) => item.default_shipping) : [null];
        }

        state.data.defaultAddress = customer ? address : null;

        // init cart & customer
        state.data.cart = cart;

        // init coupon
        state.data.isCouponAppliedToCart = cart && cart.applied_coupons ? cart.applied_coupons : false;

        // init shipping address
        let shipping;
        shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses : null;

        if (shipping) {
            if (storeConfig.enable_oms_multiseller === '1') {
                state.selected.address = {
                    firstname: shipping[0].firstname,
                    lastname: shipping[0].lastname,
                    city: shipping[0].city,
                    region: shipping[0].region,
                    country: shipping[0].country,
                    postcode: shipping[0].postcode,
                    telephone: shipping[0].telephone,
                    street: shipping[0].street,
                    pickup_location_code: shipping[0].pickup_location_code,
                };

                if (typeof shipping[0].is_valid_city !== 'undefined') {
                    state.error.shippingAddress = !shipping[0].is_valid_city;
                }

                state.pickup_location_code = shipping[0].pickup_location_code;
            } else {
                state.selected.address = {
                    firstname: shipping[0].firstname,
                    lastname: shipping[0].lastname,
                    city: shipping[0].city,
                    region: shipping[0].region,
                    country: shipping[0].country,
                    postcode: shipping[0].postcode,
                    telephone: shipping[0].telephone,
                    street: shipping[0].street,
                    pickup_location_code: shipping[0].pickup_location_code ? shipping[0].pickup_location_code : null,
                };

                if (typeof shipping.is_valid_city !== 'undefined') {
                    state.error.shippingAddress = !shipping.is_valid_city;
                }

                state.pickup_location_code = shipping.pickup_location_code;
            }
        } else if (!state.data.isGuest && address) {
            state.selected.address = {
                firstname: address.firstname,
                lastname: address.lastname,
                city: address.city,
                region: {
                    label: address.region.region,
                    code: address.region.region_code,
                },
                postcode: address.postcode,
                telephone: address.telephone,
                street: address.street,
                country: address.country,
                pickup_location_code: storeConfig.enable_oms_multiseller === '1' ? shipping[0].pickup_location_code : shipping.pickup_location_code,
            };
        }

        let cartItemBySeller = {};

        if (itemCart.cart.items.length > 0) {
            const unGroupedData = itemCart.cart.items;

            // eslint-disable-next-line no-shadow
            const groupData = unGroupedData.reduce((groupData, { id, quantity, pickup_item_store_info, prices, product, custom_seller, ...other }) => {
                let item = groupData.find((p) => p.seller_id === custom_seller.seller_id);
                if (!item) {
                    item = {
                        seller_id: custom_seller.seller_id ? custom_seller.seller_id : null,
                        seller_name: custom_seller.seller_name ? custom_seller.seller_name : null,
                        productList: [],
                        subtotal: {
                            currency: '',
                            value: 0,
                        },
                    };
                    groupData.push(item);
                }
                let child = item.productList.find((ch) => ch.name === product.name);
                if (!child) {
                    child = {
                        id,
                        prices,
                        product,
                        quantity,
                        ...other,
                    };
                    item.productList.push(child);
                    item.subtotal.currency = prices.row_total_including_tax.currency;
                    item.subtotal.value += prices.row_total_including_tax.value;
                }
                return groupData;
            }, []);
            cartItemBySeller = groupData;
        }

        if (shipping && shipping[0].available_shipping_methods?.length === 0) setLoadingSellerInfo(false);

        // init shipping method
        // if multiseller active
        if (storeConfig.enable_oms_multiseller === '1') {
            if (shipping && shipping[0].available_shipping_methods) {
                const availableMultiShipping = shipping.map((shippingPerSeller) => ({
                    seller_id: shippingPerSeller.seller_id ? shippingPerSeller.seller_id : 0,
                    available_shipping_methods: shippingPerSeller.available_shipping_methods.filter(
                        (item) => item.carrier_code !== 'pickup' && item.carrier_code !== 'instore'
                    ),
                }));

                setAmountSeller(availableMultiShipping.length);

                // eslint-disable-next-line consistent-return
                availableMultiShipping.map(async ({ seller_id, available_shipping_methods }, index) => {
                    let sellerInfo;
                    if (seller_id !== 0 || seller_id !== null) {
                        sellerInfo = await apolloClient
                            .query({ query: Schema.getSeller, variables: { sellerId: parseInt(seller_id, 10) } })
                            .then(({ data }) => {
                                return {
                                    seller_id,
                                    seller_name: data.getSeller.length > 0 ? data.getSeller[0].name : 'Default Seller',
                                    seller_city: data.getSeller.length > 0 ? data.getSeller[0].city : 'Default Seller City',
                                    available_shipping_methods: available_shipping_methods.map((shippingItemMultiseller) => ({
                                        ...shippingItemMultiseller,
                                        label: `${shippingItemMultiseller.method_title === null ? '' : `${shippingItemMultiseller.method_title} - `
                                            } ${shippingItemMultiseller.carrier_title} `,
                                        promoLabel: `${shippingItemMultiseller.shipping_promo_name}`,
                                        value: `${shippingItemMultiseller.carrier_code}_${shippingItemMultiseller.method_code}`,
                                    })),
                                };
                            });
                        state.data.seller.push(sellerInfo);
                        setSellerInfoState((prevState) => [...prevState, sellerInfo]);
                        setCurrentIndexSeller(index);
                    } else {
                        setCurrentIndexSeller(index);
                        return {
                            seller_id: 0,
                            seller_name: 'Default Seller',
                            seller_city: 'Default Seller City',
                            available_shipping_methods: available_shipping_methods.map((shippingItemMultiseller) => ({
                                ...shippingItemMultiseller,
                                label: `${shippingItemMultiseller.method_title === null ? '' : `${shippingItemMultiseller.method_title} - `} ${shippingItemMultiseller.carrier_title
                                    } `,
                                promoLabel: `${shippingItemMultiseller.shipping_promo_name}`,
                                value: `${shippingItemMultiseller.carrier_code}_${shippingItemMultiseller.method_code}`,
                            })),
                        };
                    }
                });

                state.data.shippingMethods = availableMultiShipping.map(({ seller_id, available_shipping_methods }) => ({
                    seller_id: seller_id || 0,
                    available_shipping_methods: available_shipping_methods.map((shippingItemMultiseller) => ({
                        ...shippingItemMultiseller,
                        label: `${shippingItemMultiseller.method_title === null ? '' : `${shippingItemMultiseller.method_title} - `} ${shippingItemMultiseller.carrier_title
                            } `,
                        promoLabel: `${shippingItemMultiseller.shipping_promo_name}`,
                        value: `${shippingItemMultiseller.carrier_code}_${shippingItemMultiseller.method_code}`,
                    })),
                }));
            }

            if (shipping) {
                const tempSelectedShipping = [];
                shipping.map((ship) => {
                    if (ship.selected_shipping_method) {
                        tempSelectedShipping.push({
                            seller_id: ship.seller_id,
                            selected_shipping_method: `${ship.selected_shipping_method.carrier_code}_${ship.selected_shipping_method.method_code}`,
                        });
                    }
                    return null;
                });
                state.selected.shipping = shipping.map((ship) => {
                    if (ship.selected_shipping_method) {
                        return {
                            seller_id: ship.seller_id,
                            name: {
                                carrier_code: ship.selected_shipping_method.carrier_code,
                                method_code: ship.selected_shipping_method.method_code,
                            },
                            price: ship.selected_shipping_method.amount.value,
                            original_price: ship.selected_shipping_method.amount.value,
                        };
                    }
                    return {
                        seller_id: ship.seller_id,
                        name: { carrier_code: null, method_code: null },
                        price: null,
                        original_price: null,
                    };
                });
            }
        } else {
            if (shipping && shipping[0].available_shipping_methods) {
                const availableShipping = shipping[0].available_shipping_methods.filter(
                    (x) => x.carrier_code !== 'pickup' && x.carrier_code !== 'instore'
                );

                state.data.shippingMethods = availableShipping.map((item) => ({
                    ...item,
                    label: `${item.method_title === null ? '' : `${item.method_title} - `} ${item.carrier_title} `,
                    promoLabel: `${item.shipping_promo_name}`,
                    value: `${item.carrier_code}_${item.method_code}`,
                }));
            }

            if (shipping && shipping[0].selected_shipping_method) {
                const shippingMethod = shipping[0].selected_shipping_method;
                state.selected.shipping = `${shippingMethod.carrier_code}_${shippingMethod.method_code}`;

                if (modules.checkout.pickupStore.enabled) {
                    if (shippingMethod.carrier_code === 'pickup' && shippingMethod.method_code === 'pickup') {
                        const custAddress = cart.shipping_addresses[0];
                        state.selected.delivery = 'pickup';
                        state.error.shippingAddress = false;
                        state.selectStore = {
                            city: custAddress.city,
                            country_code: custAddress.country.code,
                            name: custAddress.firstname,
                            postcode: custAddress.postcode,
                            region: custAddress.region.label,
                            street: custAddress.street,
                            telephone: custAddress.telephone,
                            code: cart.items[0].pickup_item_store_info.loc_code,
                        };
                        if (cart.pickup_store_person) {
                            state.pickupInformation = {
                                pickup_person_email: cart.pickup_store_person.email,
                                pickup_person_name: cart.pickup_store_person.name,
                                pickup_person_phone: cart.pickup_store_person.handphone,
                            };
                        }
                    }
                }

                if (shipping.pickup_location_code) {
                    state.selected.delivery = 'instore';
                    state.error.shippingAddress = false;
                }
            }
            setLoadingSellerInfo(false);
        }

        // init payment method
        if (cart.available_payment_methods) {
            state.data.paymentMethod = cart.available_payment_methods.map((method) => ({
                ...method,
                label: method.title,
                value: method.code,
                image: null,
            }));
        } else if (checkout.selected.delivery === 'pickup') {
            state.data.paymentMethod = cart.available_payment_methods.map((method) => ({
                ...method,
                label: method.title,
                value: method.code,
                image: null,
            }));
        }

        if (cart.selected_payment_method) {
            state.selected.payment = cart.selected_payment_method.code;
            if (storeConfig?.pwa?.paypal_enable && cart.selected_payment_method.code === 'paypal_express') {
                getPaypalToken({
                    variables: {
                        cartId: cart.id,
                        code: 'paypal_express',
                        returnUrl: storeConfig?.paypal_key.return_url,
                        cancelUrl: storeConfig?.paypal_key.cancel_url,
                    },
                }).then((res) => {
                    if (res.data && res.data.createPaypalExpressToken && res.data.createPaypalExpressToken.token) {
                        const { token } = res.data.createPaypalExpressToken;
                        setTokenData(res.data.createPaypalExpressToken);
                        setInitialOptionPaypal({
                            ...initialOptionPaypal,
                            'data-order-id': token,
                        });
                    }
                });
            }
        }

        if (rewardPoint && rewardPoint.data && rewardPoint.data.customerRewardPoints) {
            state.data.rewardPoints = rewardPoint.data.customerRewardPoints;
        }

        state.loading.all = false;
        state.loading.paypal = false;

        setCheckout(state);
        updateFormik(cart);
    };

    React.useEffect(() => {
        setCheckout({
            ...checkout,
            data: {
                ...checkout.data,
                isGuest: !isLogin,
            },
        });
    }, [isLogin]);

    React.useEffect(() => {
        setCheckout({
            ...checkout,
            loading: {
                ...checkout.loading,
                all: true,
                paypal: true,
            },
            data: {
                ...checkout.data,
                isGuest: !isLogin,
            },
        });

        if (!manageCustomer.data && isLogin) {
            getCustomer();
            if (modules.rewardpoint.enabled) getRewardPoint();
        }

        const loadCart = isLogin ? manageCustomer.data && !dataCart && !itemCart : !dataCart && !itemCart;

        if (loadCart && cartId) {
            getCart({ variables: { cartId } });
            getItemCart({ variables: { cartId } });
        }

        if (errorCart || errorItem) {
            if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                actUpdatePwaCheckoutLog({
                    variables: {
                        cart_id: cartId,
                        state: pwaCheckoutState,
                        status: 0,
                    },
                });
            }
            setError(true);
            timeoutWindowLocation.current = setTimeout(() => {
                window.location.replace(config.cartRedirect.link);
            }, [1000]);
        }

        if (
            dataCart
            && dataCart.cart
            && dataCart.cart.shipping_addresses
            && dataCart.cart.shipping_addresses.length === 0
            && !checkout.data.isGuest
        ) {
            setCheckout({
                ...checkout,
                loading: {
                    ...checkout.loading,
                    addresses: true,
                },
            });
            getCustomerAddress();
        }

        if (dataCart && dataCart.cart && itemCart && itemCart.cart && cartId) {
            const { cart } = dataCart;
            const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses : null;

            let cartItemBySeller = {};

            if (itemCart.cart.items.length > 0) {
                const unGroupedData = itemCart.cart.items;

                // eslint-disable-next-line no-shadow
                const groupData = unGroupedData.reduce((groupData, { id, quantity, pickup_item_store_info, prices, product, custom_seller, ...other }) => {
                    let item = groupData.find((p) => p.seller_id === custom_seller.seller_id);
                    if (!item) {
                        item = {
                            seller_id: custom_seller.seller_id ? custom_seller.seller_id : 0,
                            seller_name: custom_seller.seller_name ? custom_seller.seller_name : 'Default Seller',
                            productList: [],
                            subtotal: {
                                currency: '',
                                value: 0,
                            },
                        };
                        groupData.push(item);
                    }
                    let child = item.productList.find((ch) => ch.name === product.name);
                    if (!child) {
                        child = {
                            id,
                            prices,
                            product,
                            quantity,
                            ...other,
                        };
                        item.productList.push(child);
                        item.subtotal.currency = prices.row_total_including_tax.currency;
                        item.subtotal.value += prices.row_total_including_tax.value;
                    }
                    return groupData;
                }, []);
                cartItemBySeller = groupData;
            }

            if (shipping && storeConfig.enable_oms_multiseller === '1') {
                const sellerList = (arr) => JSON.stringify(
                    arr
                    .filter(({ seller_id: x }) => x)
                    .map(({ seller_id: x }) => x.toString())
                    .sort()
                );

                if (
                    // Multi product not yet initialized (mix/all have seller_id)
                    (shipping.length > 0 &&
                        cartItemBySeller.length !== shipping.length &&
                        shipping[0].seller_id === null &&
                        cartItemBySeller[0].seller_id !== 0) ||
                    // Single product not yet initialized (have seller_id)
                    (shipping.length === 1 &&
                        cartItemBySeller.length === shipping.length &&
                        shipping[0].seller_id === null &&
                        cartItemBySeller[0].seller_id !== 0) ||
                    // Added new product with seller_id (more/less seller on shipping_address)
                    (shipping && cartItemBySeller.length !== shipping.length && !cartItemBySeller.find((x) => x.seller_id === null)) ||
                    // If list seller_id between cartItem and shipping address not match
                    (shipping.length > 0 && cartItemBySeller.length > 0
                    && sellerList(shipping) !== sellerList(cartItemBySeller))
                ) {
                    setShippingAddressByInput({
                        variables: {
                            cartId: cart.id,
                            city: shipping[0].city,
                            countryCode: shipping[0].country.code,
                            firstname: shipping[0].firstname,
                            lastname: shipping[0].lastname,
                            telephone: shipping[0].telephone,
                            postcode: shipping[0].postcode,
                            street: shipping[0].street[0],
                            region: shipping[0].region.code,
                            regionId: shipping[0].region.region_id,
                        },
                    })
                        .then(async () => {
                            setBillingAddressByInput({
                                variables: {
                                    cartId: cart.id,
                                    city: shipping[0].city,
                                    countryCode: shipping[0].country.code,
                                    firstname: shipping[0].firstname,
                                    lastname: shipping[0].lastname,
                                    telephone: shipping[0].telephone,
                                    postcode: shipping[0].postcode,
                                    street: shipping[0].street[0],
                                    region: shipping[0].region.code,
                                    regionId: shipping[0].region.region_id,
                                },
                            })
                                .then(async (resBilling) => {
                                    updateAddressState(resBilling);
                                })
                                .catch((e) => {
                                    if (e.message.includes('Token is wrong.')) {
                                        setCheckoutTokenState(!checkoutTokenState);
                                    }
                                });
                        })
                        .catch((e) => {
                            if (e.message.includes('Token is wrong.')) {
                                setCheckoutTokenState(!checkoutTokenState);
                            }
                        });
                }
            }
            initData();
        }
    }, [manageCustomer.data, dataCart, itemCart, cartId, errorCart, errorItem]);

    // effect get customer

    React.useEffect(() => {
        if (manageCustomer && manageCustomer.data && manageCustomer.data.customer) {
            const state = { ...checkout };
            state.data.customer = manageCustomer.data.customer;
            setCheckout(state);
        }
    }, [manageCustomer.data]);

    // effect get customer address

    React.useEffect(() => {
        const state = { ...checkout };
        let customer;
        let address;
        if (
            !state.data.isGuest
            && addressCustomer
            && addressCustomer.data
            && addressCustomer.data.customer
            && addressCustomer.data.customer.addresses
        ) {
            customer = addressCustomer.data.customer;
            [address] = customer ? customer.addresses.filter((item) => item.default_shipping) : [null];
            state.data.defaultAddress = customer ? address : null;
            state.loading.addresses = false;
            setCheckout(state);
        }
    }, [addressCustomer]);

    // effect get price after update cart
    React.useEffect(() => {
        if (itemPrice && itemPrice.cart) {
            let state = { ...checkout };
            state.newupdate = false;
            state.loading.totalPrice = false;
            state.data.cart.prices = itemPrice.cart.prices;
            state.data.cart.promoBanner = itemPrice.cart.promoBanner;
            setCheckout(state);
        }
    }, [itemPrice]);

    React.useMemo(() => {
        if (checkout.data.cart) {
            const { cart } = checkout.data;
            const state = { ...checkout };
            // init shipping address
            if (storeConfig.enable_oms_multiseller === '1') {
                const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses : null;
                if (shipping && shipping[0].available_shipping_methods && shipping[0].available_shipping_methods.length > 0) {
                    const availableMultiShipping = shipping.map((shippingPerSeller) => ({
                        seller_id: shippingPerSeller.seller_id,
                        available_shipping_methods: shippingPerSeller.available_shipping_methods.filter((item) => item.carrier_code !== 'pickup'),
                    }));

                    state.data.shippingMethods = availableMultiShipping.map(({ seller_id, available_shipping_methods }) => ({
                        seller_id,
                        available_shipping_methods: available_shipping_methods.map((shippingItemMultiseller) => ({
                            ...shippingItemMultiseller,
                            label: `${shippingItemMultiseller.method_title === null ? '' : `${shippingItemMultiseller.method_title} - `} ${shippingItemMultiseller.carrier_title
                                } `,
                            promoLabel: `${shippingItemMultiseller.shipping_promo_name}`,
                            value: `${shippingItemMultiseller.carrier_code}_${shippingItemMultiseller.method_code}`,
                        })),
                    }));
                }

                if (shipping) {
                    state.selected.shipping = shipping.map((ship) => {
                        if (ship.selected_shipping_method) {
                            return {
                                seller_id: ship.seller_id,
                                name: {
                                    carrier_code: ship.selected_shipping_method.carrier_code,
                                    method_code: ship.selected_shipping_method.method_code,
                                },
                                price: ship.selected_shipping_method.amount.value,
                                original_price: ship.selected_shipping_method.amount.value,
                            };
                        }
                        return {
                            seller_id: ship.seller_id,
                            name: { carrier_code: null, method_code: null },
                            price: null,
                            original_price: null,
                        };
                    });
                }
            } else {
                const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses : null;
                if (shipping && shipping[0].available_shipping_methods && shipping[0].available_shipping_methods.length > 0) {
                    const availableShipping = shipping[0].available_shipping_methods.filter((x) => x.carrier_code !== 'pickup');

                    state.data.shippingMethods = availableShipping.map((item) => ({
                        ...item,
                        label: `${item.method_title === null ? '' : `${item.method_title} - `} ${item.carrier_title} `,
                        promoLabel: `${item.shipping_promo_name}`,
                        value: `${item.carrier_code}_${item.method_code}`,
                    }));
                }

                if (shipping && shipping[0].available_shipping_methods && shipping[0].available_shipping_methods.length > 0) {
                    const shippingMethod = shipping[0].selected_shipping_method;
                    state.selected.shipping = shippingMethod ? `${shippingMethod.carrier_code}_${shippingMethod.method_code}` : shippingMethod;
                }
            }

            setCheckout(state);
            if (checkout.newupdate) {
                getPrice({ variables: { cartId } });
                state.loading.totalPrice = true;
                setCheckout(state);
            }
        }
    }, [checkout.data.cart]);

    // GA 4 dataLayer
    React.useMemo(() => {
        if (checkout && checkout.data && checkout.data.cart && checkout.data.cart.items.length > 0) {
            const { cart } = checkout.data;
            TagManager.dataLayer({ dataLayer: { ecommerce: null } });
            TagManager.dataLayer({
                dataLayer: {
                    pageName: 'Checkout',
                    pageType: 'checkout',
                    event: 'begin_checkout',
                    cart_total: cart.prices.grand_total.value,
                    currency: cart.prices.grand_total.currency || storeConfig.base_currency_code,
                    ecommerce: {
                        items: cart.items.map((item) => ({
                            currency: item.prices.price.currency || storeConfig.base_currency_code,
                            item_name: item.product.name,
                            item_id: item.product.sku,
                            price: item.prices.price.value || 0,
                            item_category: item.product.categories.length > 0 ? item.product.categories[0].name : '',
                            item_list_name: item.product.categories.length > 0 ? item.product.categories[0].name : '',
                            quantity: item.quantity,
                            item_stock_status: item.product.stock_status,
                        })),
                        fbpixels: {
                            content_ids: cart.items.map(({ product }) => product.sku),
                            quantity: cart.items.length,
                            value: cart.prices.grand_total.value,
                            contents: cart.items.map((item) => ({
                                currency: item.prices.price.currency || storeConfig.base_currency_code,
                                name: item.product.name,
                                id: item.product.sku,
                                price: item.prices.price.value || 0,
                                category: item.product.categories.length > 0 ? item.product.categories[0].name : '',
                                list: item.product.categories.length > 0 ? item.product.categories[0].name : '',
                                quantity: item.quantity,
                                stock_status: item.product.stock_status,
                            })),
                        },
                    },
                },
            });
        }
    }, [checkout?.data?.cart?.items]);

    const handleOpenMessage = async ({ variant, text }) => {
        const state = { ...checkout };
        window.toastMessage({
            open: true,
            variant,
            text,
        });
        setCheckout(state);
    };

    const chasbackMessage = t('checkout:cashbackInfo').split('$');

    const onClickPaypal = () => {
        const state = { ...checkout };
        if (!state.loading.paypal) {
            state.loading.order = true;
        }
        setCheckout(state);
    };

    const onCancelPaypal = () => {
        Router.push(
            !modules.checkout.checkoutOnly
                ? `/${storeConfig?.paypal_key.cancel_url}`
                : `${getStoreHost(appEnv)}${storeConfig?.paypal_key.cancel_url}`,
        );
    };

    const onErrorPaypal = (err) => {
        const state = { ...checkout };
        state.loading.order = false;
        setCheckout(state);
        handleOpenMessage({
            variant: 'error',
            text: t('checkout:message:serverError'),
        });
    };

    const onApprovePaypall = async (data, actions) => {
        window.backdropLoader(true);
        const { cart } = checkout.data;
        setPaymentMethod({
            variables: {
                cartId: cart.id,
                payment_method: {
                    code: checkout.selected.payment,
                    paypal_express: {
                        payer_id: data.payerID,
                        token: initialOptionPaypal['data-order-id'],
                    },
                },
            },
        })
            .then(async (result) => {
                let state = { ...checkout };

                if (result && result.data && result.data.setPaymentMethodOnCart && result.data.setPaymentMethodOnCart.cart) {
                    const mergeCart = {
                        ...state.data.cart,
                        ...result.data.setPaymentMethodOnCart.cart,
                    };
                    state.data.cart = mergeCart;
                    state.status.purchaseOrderApply = true;
                    updateFormik(mergeCart);
                } else {
                    state.selected.payment = null;
                    handleOpenMessage({
                        variant: 'error',
                        text: t('checkout:message:emptyShippingError'),
                    });
                }

                setCheckout(state);

                const selectedPayment = checkout.data.paymentMethod.filter((item) => item.code === 'paypal_express');
                //  GTM UA dataLayer
                const dataLayer = {
                    event: 'checkout',
                    ecommerce: {
                        checkout: {
                            actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout' },
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
                            actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout_option' },
                        },
                        fbpixels: {
                            total_price: cart.prices.grand_total.value,
                        },
                    },
                };
                // GA 4 dataLayer
                const dataLayerOpt = {
                    event: 'add_payment_info',
                    ecommerce: {
                        payment_type: selectedPayment[0].title,
                        currency: storeConfig.base_currency_code || 'IDR',
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
                        fbpixels: {
                            total_price: cart.prices.grand_total.value,
                            content_ids: [
                                {
                                    payment_type: selectedPayment[0].title,
                                    items: cart.items.map(({ quantity, product, prices }) => ({
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
                                },
                            ],
                            catalog_id: cart.items.map(({ product }) => (product.categories.length > 0 ? product.categories[0].name : '')),
                        },
                    },
                };
                TagManager.dataLayer({ dataLayer });
                TagManager.dataLayer({ dataLayer: dataLayerOption });
                TagManager.dataLayer({ dataLayer: dataLayerOpt });

                let details = await fetch('/paypal/detail-transaction', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderID: data.orderID,
                    }),
                });

                // set local data

                const paypalData = {
                    data: {
                        ...data,
                        ...initialOptionPaypal,
                        ...tokenData,
                    },
                    details: {},
                };
                if (details) {
                    details = await details.json();
                    if (details && details.data && details.data.result) {
                        paypalData.details = details.data.result;
                    }
                }
                setLocalStorage(storeConfig?.paypal_key.key_data, paypalData);
                state = { ...checkout };
                window.backdropLoader(false);
                state.loading.order = false;
                setCheckout(state);

                const redirectMagentoUrl = `${getStoreHost(appEnv)}${storeConfig?.paypal_key.return_url}`;
                Router.push(!modules.checkout.checkoutOnly ? `/${storeConfig?.paypal_key.return_url}` : redirectMagentoUrl);
            })
            .catch((e) => {
                onErrorPaypal(e);
            });
    };

    const onShippingChangePaypal = (params) => {
        // const { shipping_addresses } = params;
    };

    const createOrderPaypal = (data, actions) => new Promise((resolve, reject) => {
        resolve(initialOptionPaypal['data-order-id']);
    });

    const paypalHandlingProps = {
        onClick: onClickPaypal,
        onCancel: onCancelPaypal,
        onError: onErrorPaypal,
        onApprove: onApprovePaypall,
        disabled: checkout.loading.paypal,
        onShippingChange: onShippingChangePaypal,
        createOrder: createOrderPaypal,
    };

    const contentProps = {
        formik,
        checkout,
        handleOpenMessage,
        chasbackMessage,
        updateFormik,
        setCheckout,
        refetchDataCart,
        refetchItemCart,
        manageCustomer,
        config,
        isOnlyVirtualProductOnCart,
        paypalHandlingProps,
        setInitialOptionPaypal,
        initialOptionPaypal,
        setTokenData,
        checkoutTokenState,
        setCheckoutTokenState,
        setLoadingSellerInfo,
        loadingSellerInfo,
    };

    return (
        <Layout pageConfig={configPage || pageConfig} {...props} showRecentlyBar={false} isCheckout>
            <Head>
                <script type="text/javascript" src={url} data-client-key="SB-Mid-client-1F64CqNZz3Nzvai2" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://js.braintreegateway.com/web/3.78.2/js/client.min.js" />
                <script src="https://js.braintreegateway.com/web/3.78.2/js/paypal-checkout.min.js" />
                <script type="text/javascript" src="https://js.xendit.co/v1/xendit.min.js" />
            </Head>
            <Content {...contentProps} {...props} modules={modules} currencyCache={currencyCache} />
            <Toast open={isError} message={t('checkout:cartError')} variant="error" setOpen={setError} />
        </Layout>
    );
};

export default Checkout;
