/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { removeCheckoutData, getCheckoutData } from '@helpers/cookies';
import { getCartId } from '@helpers/cartId';
import Router from 'next/router';
import Layout from '@layout';
import Head from 'next/head';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';
import Cookies from 'js-cookie';
import Toast from '@common_toast';
import gqlService from '../../services/graphql';
import {
    getCartCallbackUrl, getIpayUrl, getLoginCallbackUrl, getSuccessCallbackUrl,
} from '../../helpers/config';

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
        t, storeConfig, pageConfig, Content,
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

    let { cartId, isLogin } = props;
    let urlRedirect = '/checkout/cart';
    if (modules.checkout.checkoutOnly) {
        urlRedirect = getStoreHost();
    }
    if (typeof window !== 'undefined') {
        cartId = getCartId();
        isLogin = Cookies.get('isLogin');
        if (!cartId) {
            Router.push(urlRedirect);
        }
    }

    const {
        snap_is_production, snap_client_key, allow_guest_checkout,
    } = storeConfig;
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

    const [checkout, setCheckout] = useState({
        order_id: '',
        data: {
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
        },
        selected: {
            address: null,
            shipping: {
                name: { carrier_code: null, method_code: null },
                price: null,
                original_price: null,
            },
            payment: null,
            billing: null,
            delivery: 'home',
        },
        loading: {
            all: true,
            addresses: false,
            shipping: false,
            payment: false,
            billing: false,
            order: false,
            coupon: false,
            storeCredit: false,
            giftCard: false,
            extraFee: false,
        },
        status: {
            addresses: false,
            openAddressDialog: false,
            backdrop: false,
        },
        pickupInformation: {},
        selectStore: {},
        error: {
            pickupInformation: false,
            selectStore: false,
        },
        disabled: {
            address: false,
        },
    });

    const [isError, setError] = useState(false);
    // start init graphql
    const [getCustomer, manageCustomer] = gqlService.getCustomer();
    const [getCart, { data: dataCart, error: errorCart }] = gqlService.getCart();
    const [getItemCart, { data: itemCart, error: errorItem }] = gqlService.getItemCart();
    const [getRewardPoint, rewardPoint] = gqlService.getRewardPoint();
    const [getCustomerAddress, addressCustomer] = gqlService.getAddressCustomer();
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
                return __typename === 'VirtualProduct' || __typename === 'DownloadableProduct';
            });

            /**
             * if cartitems and cartItemsFilter length same
             * it's mean cart only contain virtual product
             */
            const isAllVirtual = cartItems.length === cartItemsFilter.length && cartItems.length == 1;
            if (isAllVirtual) return true;
        }
        return false;
    }, [checkout?.data?.cart]);

    Yup.addMethod(Yup.string, 'equalTo', equalTo);

    const CheckoutSchema = Yup.object().shape({
        email: checkout.data.isGuest ? Yup.string().nullable().email(t('validate:email:wrong')).required(t('validate:email.required')) : null,
        payment: Yup.string().nullable().required(t('validate:required')),
        oldEmail: checkout.data.isGuest ? Yup.string().equalTo(Yup.ref('email')) : null,
        address: isOnlyVirtualProductOnCart ? null : Yup.object().nullable().required(t('validate:required')),
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

    const initData = () => {
        const { cart } = dataCart;
        const { items } = itemCart.cart;
        const state = { ...checkout };
        cart.items = items;

        if (cart && cart.items && cart.items.length === 0) {
            window.location.replace(config.cartRedirect && config.cartRedirect.link ? config.cartRedirect.link : '/checkout/cart');
        } else {
            cart.items.map((item) => {
                if (item.product && item.product.stock_status === 'OUT_OF_STOCK') {
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
        const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses[0] : null;

        if (shipping) {
            state.selected.address = {
                firstname: shipping.firstname,
                lastname: shipping.lastname,
                city: shipping.city,
                region: shipping.region,
                country: shipping.country,
                postcode: shipping.postcode,
                telephone: shipping.telephone,
                street: shipping.street,
            };
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
            };
        }

        // init shipping method
        if (shipping && shipping.available_shipping_methods) {
            const availableShipping = shipping.available_shipping_methods.filter((x) => x.available && x.carrier_code !== 'pickup');
            state.data.shippingMethods = availableShipping.map((item) => ({
                ...item,
                label: `${item.method_title === null ? '' : `${item.method_title} - `} ${item.carrier_title} `,
                promoLabel: `${item.shipping_promo_name}`,
                value: `${item.carrier_code}_${item.method_code}`,

            }));
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            state.selected.shipping = `${shippingMethod.carrier_code}_${shippingMethod.method_code}`;

            if (shippingMethod.carrier_code === 'pickup' && shippingMethod.method_code === 'pickup') {
                const custAddress = cart.shipping_addresses[0];
                state.selected.delivery = 'pickup';
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
        }

        if (rewardPoint && rewardPoint.data && rewardPoint.data.customerRewardPoints) {
            state.data.rewardPoints = rewardPoint.data.customerRewardPoints;
        }

        state.loading.all = false;

        setCheckout(state);
        updateFormik(cart);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cdt = getCheckoutData();
            if (cdt) removeCheckoutData();
        }
    }, []);

    useEffect(() => {
        setCheckout({
            ...checkout,
            data: {
                ...checkout.data,
                isGuest: !isLogin,
            },
        });
    }, [isLogin]);

    useEffect(() => {
        setCheckout({
            ...checkout,
            loading: {
                ...checkout.loading,
                all: true,
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

        if (loadCart) {
            getCart({ variables: { cartId } });
            getItemCart({ variables: { cartId } });
        }

        if (errorCart && errorItem) {
            setError(true);
            // window.location.replace('/checkout/cart');
        }

        if (dataCart && dataCart.cart && dataCart.cart.shipping_addresses
            && dataCart.cart.shipping_addresses.length === 0 && !checkout.data.isGuest) {
            setCheckout({
                ...checkout,
                loading: {
                    ...checkout.loading,
                    addresses: true,
                },
            });
            getCustomerAddress();
        }

        if (dataCart && dataCart.cart && itemCart && itemCart.cart) {
            initData();
        }
    }, [manageCustomer.data, dataCart, itemCart]);

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
        if (!state.data.isGuest && addressCustomer && addressCustomer.data
            && addressCustomer.data.customer && addressCustomer.data.customer.addresses) {
            customer = addressCustomer.data.customer;
            [address] = customer
                ? customer.addresses.filter((item) => item.default_shipping)
                : [null];
            state.data.defaultAddress = customer ? address : null;
            if (!customer.addresses || customer.addresses.length === 0) {
                state.loading.addresses = false;
            }
            setCheckout(state);
        }
    }, [addressCustomer]);

    React.useMemo(() => {
        if (checkout.data.cart) {
            const { cart } = checkout.data;
            const state = { ...checkout };
            // init shipping address
            const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses[0] : null;
            if (shipping && shipping.available_shipping_methods && shipping.available_shipping_methods.length > 0) {
                const availableShipping = shipping.available_shipping_methods.filter((x) => x.available && x.carrier_code !== 'pickup');
                state.data.shippingMethods = availableShipping.map((item) => ({
                    ...item,
                    label: `${item.method_title === null ? '' : `${item.method_title} - `} ${item.carrier_title} `,
                    promoLabel: `${item.shipping_promo_name}`,
                    value: `${item.carrier_code}_${item.method_code}`,
                }));
            }

            if (
                shipping
                && shipping.selected_shipping_method
                && shipping.available_shipping_methods
                && shipping.available_shipping_methods.length > 0
            ) {
                const shippingMethod = shipping.selected_shipping_method;
                const availableShipping = shipping.available_shipping_methods.filter(
                    (x) => x.available && x.carrier_code === shippingMethod.carrier_code && x.method_code === shippingMethod.method_code,
                );
                state.selected.shipping = `${shippingMethod.carrier_code}_${shippingMethod.method_code}`;
            }

            setCheckout(state);
        }
    }, [checkout.data.cart]);

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

    const contentProps = {
        formik,
        checkout,
        handleOpenMessage,
        chasbackMessage,
        updateFormik,
        setCheckout,
        manageCustomer,
        config,
        isOnlyVirtualProductOnCart,
    };

    return (
        <Layout pageConfig={configPage || pageConfig} {...props}>
            <Head>
                <script type="text/javascript" src={url} data-client-key={snap_client_key} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Content {...contentProps} {...props} modules={modules} />
            <Toast open={isError} message={t('checkout:cartError')} variant="error" setOpen={setError} />
        </Layout>
    );
};

export default Checkout;
