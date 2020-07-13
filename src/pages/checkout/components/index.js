import { formatPrice } from '@helpers/currency';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import { removeCheckoutData, getCheckoutData } from '@helpers/cookies';
import { getLoginInfo } from '@helpers/auth';
import Typography from '@components/Typography';
import gqlService from '../services/graphql';
import useStyles from '../style';
import Address from './Address';
import DiscountSection from './DiscountSection';
import Email from './Email';
// import Payment from './Payment';
import PaymentList from './PaymentList';
import Shipping from './Shipping';
import Summary from './Summary';
import Delivery from './Delivery';
import PickupInfo from './PickupInformation';

const Checkout = (props) => {
    const { t, cartId, storeConfig } = props;
    const styles = useStyles();
    const [checkout, setCheckout] = useState({
        order_id: '',
        data: {
            cart: null,
            customer: null,
            shippingMethods: [],
            paymentMethod: [],
            isGuest: false,
            isCouponAppliedToCart: false,
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
    });

    // start init graphql
    const [getCustomer, manageCustomer] = gqlService.getCustomer();
    const [getCart, { data: dataCart, error: errorCart }] = gqlService.getCart();
    const [getRewardPoint, rewardPoint] = gqlService.getRewardPoint();
    // end init graphql

    const CheckoutSchema = Yup.object().shape({
        email: checkout.data.isGuest ? Yup.string().nullable().email(t('validate:email:wrong')).required(t('validate:email.required')) : null,
        address: Yup.object().nullable().required(t('validate:required')),
        shipping: checkout.selected.delivery === 'home' && Yup.object().nullable().required(t('validate:required')),
        payment: Yup.string().nullable().required(t('validate:required')),
        billing: Yup.object().nullable().required(t('validate:required')),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            coupon: '',
            giftCard: '',
            address: null,
            shipping: null,
            payment: null,
            billing: null,
            delivery: 'home',
        },
        validationSchema: CheckoutSchema,
        onSubmit: () => {},
    });

    const updateFormik = (cart) => {
        const [address] = cart.shipping_addresses ? cart.shipping_addresses : null;
        const shipping = address && address.selected_shipping_method;
        const { email } = cart;
        const payment = cart.selected_payment_method && cart.selected_payment_method.code;
        const billing = cart.billing_address;

        if (!email && _.isEmpty(formik.values.email)) {
            formik.setFieldValue('email', email || '');
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
        const state = { ...checkout };

        if (cart.items.length === 0) {
            window.location.replace('/checkout/cart');
        }

        const { customer } = state.data.isGuest ? {} : manageCustomer.data;
        const [address] = customer
            ? customer.addresses.filter((item) => item.default_shipping)
            : [null];

        state.data.defaultAddress = customer ? address : null;

        // init cart & customer
        state.data.customer = customer;
        state.data.cart = cart;

        // init coupon
        state.data.isCouponAppliedToCart = cart.applied_coupons || false;

        // init shipping address
        const [shipping] = cart.shipping_addresses ? cart.shipping_addresses : null;

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
                },
                postcode: address.postcode,
                telephone: address.telephone,
                street: address.street,
            };
        }

        // init shipping method
        if (shipping && shipping.available_shipping_methods) {
            const availableShipping = shipping.available_shipping_methods.filter((x) => x.available && x.carrier_code !== 'pickup');
            state.data.shippingMethods = availableShipping.map((item) => ({
                ...item,
                label: `${item.method_title} ${item.carrier_title}`,
                value: {
                    name: { carrier_code: item.carrier_code, method_code: item.method_code },
                    price: formatPrice(item.amount.value, item.amount.currency),
                },
            }));
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            state.selected.shipping = {
                name: { carrier_code: shippingMethod.carrier_code, method_code: shippingMethod.method_code },
                price: formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency),
            };
        }

        // init payment method
        if ((shipping && shipping.selected_shipping_method && cart.available_payment_methods)) {
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
            loading: {
                ...checkout.loading,
                all: true,
            },
            data: {
                ...checkout.data,
                isGuest: !getLoginInfo(),
            },
        });

        if (!manageCustomer.data && getLoginInfo()) {
            getCustomer();
            getRewardPoint();
        }

        const loadCart = getLoginInfo() ? manageCustomer.data && !dataCart : !dataCart;

        if (loadCart) {
            getCart({ variables: { cartId } });
        }

        if (errorCart) {
            window.location.replace('/checkout/cart');
        }

        if (dataCart) {
            initData();
        }
    }, [manageCustomer.data, dataCart]);

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

    return (
        <div className={styles.root}>
            {
                checkout.data.cart && checkout.data.cart.applied_cashback.is_cashback && (
                    <div className="m-15">
                        <Alert Saverity="success">
                            { chasbackMessage[0] }
                            <Typography type="bold">
                                {formatPrice(checkout.data.cart.applied_cashback.data[0].amount,
                                    storeConfig.base_currency_code)}
                            </Typography>
                            { chasbackMessage[1]}
                            <Typography type="bold">
                                {checkout.data.cart.applied_cashback.data[0].promo_name}
                            </Typography>
                            { chasbackMessage[2]}
                        </Alert>
                    </div>
                )
            }
            <div className={styles.container}>
                {
                    storeConfig.pickup_store ? (
                        <Delivery
                            t={t}
                            styles={styles}
                            formik={formik}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            storeConfig={storeConfig}
                        />
                    ) : null
                }
                <Email
                    t={t}
                    styles={styles}
                    formik={formik}
                    checkout={checkout}
                />
                {
                    checkout.selected.delivery === 'home' ? (
                        <Address
                            checkout={checkout}
                            t={t}
                            styles={styles}
                            setCheckout={setCheckout}
                            defaultAddress={checkout.data.defaultAddress}
                            updateFormik={updateFormik}
                        />
                    ) : (
                        <PickupInfo
                            t={t}
                            styles={styles}
                            formik={formik}
                            checkout={checkout}
                            setCheckout={setCheckout}
                        />
                    )
                }
                <Shipping
                    t={t}
                    checkout={checkout}
                    setCheckout={setCheckout}
                    updateFormik={updateFormik}
                    formik={formik}
                    handleOpenMessage={handleOpenMessage}
                    styles={styles}
                    storeConfig={storeConfig}
                />
                <PaymentList
                    checkout={checkout}
                    setCheckout={setCheckout}
                    updateFormik={updateFormik}
                    handleOpenMessage={handleOpenMessage}
                    styles={styles}
                    t={t}
                    storeConfig={storeConfig}
                />
                {/* <Payment
                    checkout={checkout}
                    setCheckout={setCheckout}
                    updateFormik={updateFormik}
                    handleOpenMessage={handleOpenMessage}
                    styles={styles}
                    t={t}
                    storeConfig={storeConfig}
                /> */}
                <DiscountSection
                    t={t}
                    checkout={checkout}
                    setCheckout={setCheckout}
                    handleOpenMessage={handleOpenMessage}
                    formik={formik}
                    styles={styles}
                    storeConfig={storeConfig}
                />
            </div>
            <Summary
                {...props}
                loading={checkout.loading.order}
                disabled={checkout.loading.all}
                checkout={checkout}
                updateFormik={updateFormik}
                setCheckout={setCheckout}
                handleOpenMessage={handleOpenMessage}
                styles={styles}
                formik={formik}
                storeConfig={storeConfig}
            />
        </div>
    );
};

export default Checkout;
