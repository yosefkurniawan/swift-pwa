/* eslint-disable no-unused-vars */
import AddressFormDialog from '@components/AddressFormDialog';
import Button from '@components/Button';
import Radio from '@components/Forms/Radio';
import TextField from '@components/Forms/TextField';
/* eslint-disable no-unused-expressions */
import Typography from '@components/Typography';
import {
    FormControl, FormHelperText, IconButton, Input, InputAdornment, Link,
} from '@material-ui/core';
import { Help } from '@material-ui/icons';
import classNames from 'classnames';
import { useFormik } from 'formik';
import _ from 'lodash';
import Routes from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import gqlService from '../services/graphql';
import useStyles from '../style';
import DeliveryItem from './RadioDeliveryItem';
import Summary from './Summary';

const deliveryData = [
    { label: 'Standart', value: { name: 'standart', price: 20000 } },
    { label: 'Express', value: { name: 'express', price: 35000 } },
];

const FieldPoint = ({
    onChange = () => {}, value = '', placeholder = '', action, disabled, id = null, name = null,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.fieldPoinContainer}>
            <TextField id={id} name={name} disabled={disabled} value={value} onChange={onChange} placeholder={placeholder} />
            <div>
                <Button variant="outlined" className={styles.btnAplly} onClick={action}>
                    <Typography variant="p" type="bold" letter="uppercase">
                        {disabled ? 'Remove' : 'Aplly'}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

const Checkout = (props) => {
    const { t, cartId, token } = props;
    const styles = useStyles();
    const [delivery, setDelivery] = useState([]);
    const [payment, setPayment] = React.useState([]);
    const [summary, setSummary] = useState([{ item: 'sub total', value: 300000 }]);
    const [point, setPoint] = useState(100000);
    const [credit, setCredit] = useState(100000);
    const getCustomer = gqlService.getCustomer();
    const [setGuestEmailAddressOnCart] = gqlService.setGuestEmailAddressOnCart();
    const [applyCouponTocart] = gqlService.applyCouponToCart();
    const [removeCouponFromCart] = gqlService.removeCouponFromCart();
    const [getCart, { data: dataCart, error: errorCart }] = gqlService.getCart();
    const [setShippingAddressById] = gqlService.setShippingAddress();
    const [setShippingAddressByInput] = gqlService.setShippingAddressByInput();
    const [setShippingMethod] = gqlService.setShippingMethod();
    const [setBillingAddressById] = gqlService.setBillingAddressById();
    const [setBillingAddressByInput] = gqlService.setBillingAddressByInput();
    const [setPaymentMethod] = gqlService.setPaymentMethod();
    const [placeOrder] = gqlService.placeOrder();
    const [drawer, setDrawer] = useState(false);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success, setSuccess] = useState(false);

    const CheckoutSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:emailPhone')),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            coupon: '',
        },
        validationSchema: CheckoutSchema,
    });

    const [checkout, setCheckout] = useState({
        data: {
            cart: null,
            customer: null,
            shippingMethods: [],
            summary: [],
            paymentMethod: [],
            total: 0,
            isGuest: false,
            isCouponAppliedToCart: false,
        },
        selected: {
            address: null,
            shipping: {
                name: { carrier_code: null, method_code: null },
                price: null,
            },
            payment: null,
            billing: null,
        },
        loading: {
            addresses: true,
            shipping: false,
            payment: false,
            billing: false,
            order: false,
            summary: false,
            coupon: false,
        },
    });

    const setAdrress = async (address, cart) => {
        const state = { ...checkout };
        let resultShippingAddress = null;

        if (checkout.data.isGuest) {
            resultShippingAddress = await setShippingAddressByInput({
                variables: {
                    cartId,
                    ...address,
                },
            });

            await setBillingAddressByInput({
                variables: {
                    cartId: cart.id,
                    ...address,
                },
            });
        } else {
            resultShippingAddress = await setShippingAddressById({
                variables: {
                    cartId: cart.id,
                    addressId: address.id,
                },
            });

            await setBillingAddressById({
                variables: {
                    cartId: cart.id,
                    addressId: address.id,
                },
            });
        }

        [resultShippingAddress] = resultShippingAddress.data.setShippingAddressesOnCart.cart.shipping_addresses;

        const shippingMethods = resultShippingAddress.available_shipping_methods.map((shipping) => ({
            ...shipping,
            label: `${shipping.method_title} ${shipping.carrier_title}`,
            value: {
                name: { carrier_code: shipping.carrier_code, method_code: shipping.method_code },
                price: shipping.amount.value,
            },
        }));

        const addressKeys = Object.keys(resultShippingAddress);
        const allowedKeys = addressKeys.filter((item) => item !== 'available_shipping_methods');
        const dataAddress = _.pick(resultShippingAddress, allowedKeys);

        state.data.shippingMethods = shippingMethods;
        state.selected.address = dataAddress;
        state.loading.addresses = false;

        setCheckout(state);
    };

    const manageSummary = async (cart) => {
        const state = { ...checkout };
        const data = [];
        const {
            prices, applied_coupons, items, shipping_addresses,
        } = cart;
        const subtotal = items.reduce((prev, curr) => prev + curr.prices.row_total.value, 0);
        const total = prices.grand_total.value;
        const [shipping] = shipping_addresses;

        data.push({ item: 'sub total', value: subtotal });

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            data.push({ item: 'shipping', value: shippingMethod.amount.value });
        }

        if (applied_coupons) {
            const coupon = prices.discounts[0].amount.value;
            data.push({ item: 'promo', value: -(coupon) });
        }

        state.data.total = total;
        state.data.summary = data;
        setCheckout(state);
    };

    const initData = useCallback(() => {
        const { cart } = dataCart;
        const state = { ...checkout };

        if (cart.items.length === 0) {
            window.location = '/cart';
        }

        const { customer } = getCustomer.data;
        const [address] = customer
            ? customer.addresses.filter((item) => item.default_shipping)
            : [null];

        if (!token) {
            state.data.isGuest = true;
        }

        // init cart & customer
        state.data.customer = customer;
        state.data.cart = cart;

        // init subtotal & summary
        const itemSubtotal = cart.items.reduce((prev, curr) => prev + curr.prices.row_total.value, 0);
        state.data.total = cart.prices.grand_total.value;

        // init coupon
        if (cart.applied_coupons) {
            const [coupon] = cart.applied_coupons;
            formik.values.coupon = coupon.code;
            state.data.isCouponAppliedToCart = true;
        }

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
        } else if (!state.data.isGuest) {
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
            const availableShipping = shipping.available_shipping_methods.filter((x) => x.available);
            state.data.shippingMethods = availableShipping.map((item) => ({
                ...item,
                label: `${item.method_title} ${item.carrier_title}`,
                value: {
                    name: { carrier_code: item.carrier_code, method_code: item.method_code },
                    price: item.amount.value,
                },
            }));
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            state.selected.shipping = {
                name: { carrier_code: shippingMethod.carrier_code, method_code: shippingMethod.method_code },
                price: shippingMethod.amount.value,
            };
        }

        // init payment method
        if (shipping && shipping.selected_shipping_method && cart.available_payment_methods) {
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

        state.loading.shipping = false;
        state.loading.payment = false;
        state.loading.addresses = false;

        setCheckout(state);

        manageSummary(cart);

        // init billing address for logged in customer with default address
        if (!cart.billing_address && address) {
            setAdrress(address, cart);
        }
    }, [dataCart]);

    useEffect(() => {
        setCheckout({
            ...checkout,
            loading: {
                ...checkout.loading,
                addresses: true,
            },
        });

        if (getCustomer.data && !dataCart) {
            getCart({ variables: { cartId } });
        }

        if (errorCart) {
            window.location = '/cart';
        }

        if (dataCart) {
            initData();
        }
    }, [getCustomer, dataCart]);

    const handleAddres = () => {};

    const handleShipping = async (val) => {
        const { cart, summary: dataSummary } = checkout.data;
        const { carrier_code, method_code } = val.name;
        const state = { ...checkout };
        state.selected.shipping = val;
        setCheckout(state);

        const updatedCart = (
            await setShippingMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: carrier_code,
                    methodCode: method_code,
                },
            })
        ).data.setShippingMethodsOnCart.cart;

        const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
            ...method,
            label: method.title,
            value: method.code,
            image: null,
        }));

        state.data.paymentMethod = paymentMethod;
        setCheckout(state);

        manageSummary(updatedCart);
    };

    const handlePayment = async (val) => {
        const { cart } = checkout.data;
        setCheckout({
            ...checkout,
            selected: {
                ...checkout.selected,
                payment: val,
            },
        });

        const result = await setPaymentMethod({ variables: { cartId: cart.id, code: val } });
    };

    const handlePromo = async () => {
        setCheckout({
            ...checkout,
            loading: {
                ...checkout.loading,
                coupon: true,
            },
        });

        const state = { ...checkout };
        let cart;

        state.data.isCouponAppliedToCart = !state.data.isCouponAppliedToCart;

        if (state.data.isCouponAppliedToCart) {
            const { data } = await applyCouponTocart({ variables: { cartId: checkout.data.cart.id, coupon: formik.values.coupon } });
            cart = data.applyCouponToCart.cart;
        } else {
            const { data } = await removeCouponFromCart({ variables: { cartId: checkout.data.cart.id } });
            cart = data.removeCouponFromCart.cart;
        }

        manageSummary(cart);
        state.loading.coupon = false;

        setCheckout(state);
    };

    const handleGift = () => {
        let include = false;
        const newData = [];
        summary.forEach((item) => {
            if (item.item === 'gift') {
                include = true;
                // eslint-disable-next-line no-param-reassign
                item.value = -30000;
            }
            newData.push(item);
        });

        include === false ? setSummary([...newData, { item: 'gift', value: -30000 }]) : setSummary(newData);
    };
    const handleCheckBalance = () => {};

    const handleUsePoint = async () => {
        if (point !== 0) {
            let include = false;
            const newData = [];
            summary.forEach((item) => {
                if (item.item === 'point') {
                    include = true;
                    // eslint-disable-next-line no-param-reassign
                    item.value = -point;
                }
                newData.push(item);
            });

            include === false ? await setSummary([...newData, { item: 'point', value: -point }]) : await setSummary(newData);

            setPoint(0);
        }
    };

    const handleUseCredit = async () => {
        if (credit !== 0) {
            let include = false;
            const newData = [];
            summary.forEach((item) => {
                if (item.item === 'credit') {
                    include = true;
                    // eslint-disable-next-line no-param-reassign
                    item.value = -credit;
                }
                newData.push(item);
            });

            include === false ? await setSummary([...newData, { item: 'credit', value: -credit }]) : await setSummary(newData);

            setCredit(0);
        }
    };

    const handlePlaceOrder = async () => {
        const { cart, isGuest } = checkout.data;
        if (isGuest && !formik.errors.email) {
            const setEmailAddress = await setGuestEmailAddressOnCart({ variables: { cartId: cart.id, email: formik.values.email } });
        }

        const incrementId = await placeOrder({ variables: { cartId: cart.id } });
        Routes.push('/thanks');
    };

    const getRenderAddress = () => {
        const { address } = checkout.selected;
        const { loading, data } = checkout;
        const street = _.isNull(address) ? null : address.street.join(' ');
        let dialogProps;

        if (data.isGuest) {
            dialogProps = address
                ? {
                    region: address.region.label,
                    country: address.country.code,
                    city: address.city,
                    street: address.street,
                    firstname: address.firstname,
                    lastname: address.lastname,
                    postcode: address.postcode,
                    telephone: address.telephone,
                }
                : {};
        }

        let content;

        if (loading.address) {
            content = 'loading';
        } else if (data.isGuest && !address) {
            content = 'Please add shipping address';
        } else if (address) {
            content = `${address.firstname} ${address.lastname} ${street} 
            ${address.city} ${address.region.label} ${address.postcode} ${address.telephone}`;
        } else {
            content = 'No Default Address';
        }

        return (
            <div className={styles.addressContainer}>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:shippingAddress')}
                    </Typography>
                    <Typography variant="p">
                        {content}
                    </Typography>
                </div>
                <div>
                    <AddressFormDialog
                        {...dialogProps}
                        t={t}
                        onSubmitAddress={(dataAddress, type) => {
                            const { cart } = checkout.data;
                            setDrawer(!drawer);
                            setAdrress(dataAddress, cart);
                        }}
                        loading={loadingAddress}
                        success={success}
                        open={drawer}
                        setOpen={() => setDrawer(!drawer)}
                    />
                    {loading.addresses ? null : (
                        <Button
                            variant="outlined"
                            href={data.isGuest ? null : '/customer/account/address'}
                            onClick={
                                data.isGuest
                                    ? () => {
                                        setDrawer(!drawer);
                                    }
                                    : null
                            }
                        >
                            <Typography variant="p" type="bold" letter="uppercase">
                                {data.isGuest && !address ? 'Add Address' : t(_.isNull(address) ? 'common:button:manage' : 'common:button:change')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {checkout.data.isGuest ? (
                    <div className={styles.block}>
                        <Typography variant="title" type="bold" letter="uppercase">
                            {t('checkout:emailAddress')}
                        </Typography>
                        <div style={{ margin: '5px' }}>
                            <FormControl fullWidth error={!!formik.errors.email} style={{ marginTop: '10px', marginBottom: '20px' }}>
                                <Input
                                    name="email"
                                    placeholder="john.doe@gmail.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    endAdornment={(
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility">
                                                <Help />
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                />
                                <FormHelperText>{formik.errors.email || null}</FormHelperText>
                            </FormControl>
                        </div>
                        <Typography variant="p" type="regular" decoration="underline">
                            <Link href="/customer/account/login">Already have an account? Login Here</Link>
                        </Typography>
                    </div>
                ) : null}
                <div className={styles.block}>{getRenderAddress()}</div>
                <div className={styles.block}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:deliveryMethod')}
                    </Typography>
                    {checkout.loading.shipping ? 'LOADING' : null}
                    {checkout.data.shippingMethods.length === 0 ? (
                        <Typography variant="p">There is no delivery method available for selected address</Typography>
                    ) : (
                        <Radio
                            value={checkout.selected.shipping}
                            onChange={handleShipping}
                            classContainer={styles.listShipping}
                            CustomItem={DeliveryItem}
                            valueData={checkout.data.shippingMethods}
                        />
                    )}
                </div>
                <div className={styles.block}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:payment')}
                    </Typography>
                    <Typography variant="p">{t('checkout:paymentSubtitle')}</Typography>
                    <div>
                        <Radio
                            value={checkout.selected.payment}
                            onChange={handlePayment}
                            valueData={checkout.data.paymentMethod}
                            CustomItem={DeliveryItem}
                            propsItem={{
                                borderBottom: false,
                                RightComponent: true,
                            }}
                        />
                    </div>
                </div>
                <div className={classNames(styles.block, styles.rmBorder)}>
                    <FieldPoint
                        id="coupon"
                        placeholder="Promo Code"
                        action={handlePromo}
                        onChange={formik.handleChange}
                        value={formik.values.coupon}
                        disabled={checkout.data.isCouponAppliedToCart}
                    />
                    <FieldPoint placeholder="Gift Card Number" action={handleGift} />
                    <Button variant="text" className={styles.btnBalanceGift}>
                        <Typography variant="p" decoration="underline" letter="capitalize">
                            Check Balance
                        </Typography>
                    </Button>
                    <div className={styles.cardPoint}>
                        <div className="column">
                            <Typography variant="span" letter="capitalize">
                                My Point
                            </Typography>
                            <Typography variant="title" type="bold" className={styles.pointText}>
                                {point.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </Typography>
                        </div>
                        <div>
                            <Button variant="outlined" className={styles.btnPoint} onClick={handleUsePoint}>
                                <Typography variant="p" type="bold" letter="uppercase">
                                    USE MY POIN
                                </Typography>
                            </Button>
                        </div>
                    </div>
                    <div className={styles.cardPoint}>
                        <div className="column">
                            <Typography variant="span" letter="capitalize">
                                My Credit
                            </Typography>
                            <Typography variant="title" type="bold" className={styles.pointText}>
                                {credit.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </Typography>
                        </div>
                        <div>
                            <Button variant="outlined" className={styles.btnPoint} onClick={handleUseCredit}>
                                <Typography variant="p" type="bold" letter="uppercase" align="center">
                                    use my credit
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Summary {...props} data={checkout.data.summary} total={checkout.data.total} onClick={handlePlaceOrder} />
        </div>
    );
};

export default Checkout;
