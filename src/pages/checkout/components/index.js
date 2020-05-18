/* eslint-disable no-unused-vars */
import AddressFormDialog from '@components/AddressFormDialog';
import Button from '@components/Button';
import Radio from '@components/Forms/Radio';
import TextField from '@components/Forms/TextField';
import Backdrop from '@components/Loaders/Backdrop';
import Message from '@components/Toast';
/* eslint-disable no-unused-expressions */
import Typography from '@components/Typography';
import { removeCartId } from '@helpers/cartId';
import { formatPrice } from '@helpers/currency';
import {
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    Link,
    Popover,
} from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { setCountCart } from '@stores/actions/cart';
import classNames from 'classnames';
import { useFormik } from 'formik';
import _ from 'lodash';
import Routes from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import gqlService from '../services/graphql';
import useStyles from '../style';
import DeliveryItem from './RadioDeliveryItem';
import Summary from './Summary';

const CLOSE_ADDRESS_DIALOG = 750;

const FieldPoint = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    action,
    disabled,
    id = null,
    name = null,
    error,
    errorMessage = 'error',
    loading = false,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.fieldPoinContainer}>
            <TextField
                id={id}
                name={name}
                disabled={disabled}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                error={error}
                errorMessage={error ? errorMessage : null}
            />
            <div>
                <Button variant="outlined" className={styles.btnAplly} onClick={action} disabled={loading}>
                    <Typography variant="p" color={loading ? 'white' : 'default'} type="bold" letter="uppercase">
                        {disabled ? 'Remove' : 'Apply'}
                    </Typography>
                    {loading && (
                        <CircularProgress
                            style={{
                                position: 'absolute', top: '50%', left: '50%', marginTop: -6, marginLeft: -6, color: 'black',
                            }}
                            size={12}
                        />
                    )}
                </Button>
            </div>
        </div>
    );
};

const Checkout = (props) => {
    const { t, cartId, token } = props;
    const styles = useStyles();
    const dispatch = useDispatch();
    const [checkout, setCheckout] = useState({
        data: {
            cart: null,
            customer: null,
            shippingMethods: [],
            summary: [],
            paymentMethod: [],
            total: {
                value: 0,
                currency: null,
            },
            isGuest: false,
            isCouponAppliedToCart: false,
            point: 0,
            credit: 0,
            message: {
                open: false,
                text: '',
                variant: '',
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
        },
        loading: {
            all: true,
            addresses: false,
            shipping: false,
            payment: false,
            billing: false,
            order: false,
            summary: false,
            coupon: false,
        },
        status: {
            addresses: false,
            openAddressDialog: false,
            backdrop: false,
        },
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'email-helper' : undefined;

    // start init graphql
    const getCustomer = gqlService.getCustomer();
    const [setGuestEmailAddressOnCart] = gqlService.setGuestEmailAddressOnCart();
    const [applyCouponTocart] = gqlService.applyCouponToCart({
        onError: (errors) => {},
    });
    const [removeCouponFromCart] = gqlService.removeCouponFromCart();
    const [getCart, { data: dataCart, error: errorCart }] = gqlService.getCart();
    const [setShippingAddressById] = gqlService.setShippingAddress();
    const [setShippingAddressByInput] = gqlService.setShippingAddressByInput();
    const [setShippingMethod] = gqlService.setShippingMethod({
        onError: (errors) => {},
    });
    const [setBillingAddressById] = gqlService.setBillingAddressById();
    const [setBillingAddressByInput] = gqlService.setBillingAddressByInput();
    const [setPaymentMethod] = gqlService.setPaymentMethod({
        onError: (errors) => {},
    });
    const [getSnapToken, { data: dataSnap, error: errorSnap }] = gqlService.getSnapToken({
        onError: (errors) => {},
    });
    const [getSnapOrderStatusByOrderId, { data: statusSnap, error: errorStatusSnap }] = gqlService.getSnapOrderStatusByOrderId({
        onError: () => {},
    });
    const [placeOrder] = gqlService.placeOrder({
        onError: (errors) => {},
    });
    // end init graphql

    const CheckoutSchema = Yup.object().shape({
        email: checkout.data.isGuest ? Yup.string().nullable().email(t('validate:email:wrong')).required(t('validate:email.required')) : null,
        address: Yup.object().nullable().required(t('validate:required')),
        shipping: Yup.object().nullable().required(t('validate:required')),
        payment: Yup.string().nullable().required(t('validate:required')),
        billing: Yup.object().nullable().required(t('validate:required')),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            coupon: '',
            address: null,
            shipping: null,
            payment: null,
            billing: null,
        },
        validationSchema: CheckoutSchema,
        onSubmit: () => {},
    });

    const updateFormik = (cart) => {
        const [address] = cart.shipping_addresses ? cart.shipping_addresses : null;
        const shipping = address.selected_shipping_method;
        const { email } = cart;
        const payment = cart.selected_payment_method && cart.selected_payment_method.code;
        const billing = cart.billing_address;

        if (!email && _.isEmpty(formik.values.email)) {
            formik.setFieldValue('email', email);
        }

        formik.setFieldValue('address', address);
        formik.setFieldValue('shipping', shipping);
        formik.setFieldValue('payment', payment);
        formik.setFieldValue('billing', billing);
    };

    const updateAddressState = (resultShippingAddress) => {
        const state = { ...checkout };

        const [shippingAddress] = resultShippingAddress.data.setShippingAddressesOnCart.cart.shipping_addresses;

        const shippingMethods = shippingAddress.available_shipping_methods.map((shipping) => ({
            ...shipping,
            label: `${shipping.method_title} ${shipping.carrier_title}`,
            value: {
                name: { carrier_code: shipping.carrier_code, method_code: shipping.method_code },
                price: formatPrice(shipping.amount.value, shipping.amount.currency),
            },
        }));

        const addressKeys = Object.keys(shippingAddress);
        const allowedKeys = addressKeys.filter((item) => item !== 'available_shipping_methods');
        const dataAddress = _.pick(shippingAddress, allowedKeys);

        state.data.shippingMethods = shippingMethods;
        state.selected.address = dataAddress;
        state.loading.addresses = false;

        setCheckout(state);

        updateFormik(resultShippingAddress.data.setShippingAddressesOnCart.cart);
    };

    const setAddress = (address, cart) => new Promise((resolve, reject) => {
        const state = { ...checkout };
        state.loading.addresses = true;
        setCheckout(state);

        let resultShippingAddress;

        if (checkout.data.isGuest) {
            setShippingAddressByInput({
                variables: {
                    cartId,
                    ...address,
                },
            }).then((resShipping) => {
                setBillingAddressByInput({
                    variables: {
                        cartId: cart.id,
                        ...address,
                    },
                }).then((res) => {
                    updateAddressState(resShipping);
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                reject();
            });
        } else {
            resultShippingAddress = setShippingAddressById({
                variables: {
                    cartId: cart.id,
                    addressId: address.id,
                },
            }).then((resShipping) => {
                setBillingAddressById({
                    variables: {
                        cartId: cart.id,
                        addressId: address.id,
                    },
                }).then((res) => {
                    updateAddressState(resShipping);
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                reject();
            });
        }
    });

    const manageSummary = async (cart) => {
        const state = { ...checkout };
        let data = [];
        const {
            prices, applied_coupons, items, shipping_addresses,
        } = cart;

        const sumTotalItem = items.reduce((prev, curr) => ({
            value: prev.value + curr.prices.row_total.value,
            currency: curr.prices.row_total.currency,
        }), { value: 0 });
        const subtotal = formatPrice(sumTotalItem.value, sumTotalItem.currency);
        const total = prices.grand_total;
        const [shipping] = shipping_addresses;

        data.push({ item: 'sub total', value: subtotal });

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            const price = formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency);
            data.push({ item: 'shipping', value: price });
        }

        if (_.isArray(prices.discounts)) {
            const discounts = prices.discounts.map((disc) => {
                const price = formatPrice(disc.amount.value, disc.amount.currency);
                return { item: `${disc.label} - ${price}`, value: `-${price}` };
            });
            data = data.concat(discounts);
        }

        state.data.total = total;
        state.data.summary = data;
        setCheckout(state);
    };

    const initData = () => {
        const { cart } = dataCart;
        const state = { ...checkout };

        if (cart.items.length === 0) {
            window.location = '/checkout/cart';
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
        state.data.total = cart.prices.grand_total;

        // init coupon
        if (cart.applied_coupons) {
            const [coupon] = cart.applied_coupons;
            formik.setFieldValue('coupon', coupon.code);
            state.data.isCouponAppliedToCart = true;
        }

        // init email
        if (cart.email && state.data.isGuest) {
            formik.setFieldValue('email', cart.email || '');
        }

        // init shipping address
        const [shipping] = cart.shipping_addresses ? cart.shipping_addresses : null;

        if (shipping) {
            formik.setFieldValue('address', {
                firstname: shipping.firstname,
                lastname: shipping.lastname,
                city: shipping.city,
                region: shipping.region,
                country: shipping.country,
                postcode: shipping.postcode,
                telephone: shipping.telephone,
                street: shipping.street,
            });
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
            formik.setFieldValue('address', {
                firstname: address.firstname,
                lastname: address.lastname,
                city: address.city,
                region: {
                    label: address.region.region,
                },
                postcode: address.postcode,
                telephone: address.telephone,
                street: address.street,
            });
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
                    price: formatPrice(item.amount.value, item.amount.currency),
                },
            }));
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            formik.setFieldValue('shipping', {
                name: { carrier_code: shippingMethod.carrier_code, method_code: shippingMethod.method_code },
                price: shippingMethod.amount.value,
            });
            state.selected.shipping = {
                name: { carrier_code: shippingMethod.carrier_code, method_code: shippingMethod.method_code },
                price: formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency),
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
            formik.setFieldValue('payment', cart.selected_payment_method.code);

            state.selected.payment = cart.selected_payment_method.code;
        }

        state.loading.all = false;

        setCheckout(state);

        manageSummary(cart);

        // init billing address for logged in customer with default address
        if (address && !state.data.isGuest) {
            setAddress(address, cart);
        }
    };

    useEffect(() => {
        setCheckout({
            ...checkout,
            loading: {
                ...checkout.loading,
                all: true,
            },
        });

        if (getCustomer.data && !dataCart) {
            getCart({ variables: { cartId } });
        }

        if (errorCart) {
            window.location = '/checkout/cart';
        }

        if (dataCart) {
            initData();
        }
    }, [getCustomer, dataCart]);

    const handleOpenMessage = ({ variant, text }) => {
        const state = { ...checkout };
        state.data.message.variant = variant;
        state.data.message.text = text;
        state.data.message.open = !checkout.data.message.open;
        setCheckout(state);
    };

    const handleAddres = () => {};

    const handleShipping = async (val) => {
        if (val) {
            const { cart, summary: dataSummary } = checkout.data;
            const { carrier_code, method_code } = val.name;
            let state = { ...checkout };
            state.selected.shipping = val;
            state.status.backdrop = true;
            setCheckout(state);

            let updatedCart = (
                await setShippingMethod({
                    variables: {
                        cartId: cart.id,
                        carrierCode: carrier_code,
                        methodCode: method_code,
                    },
                })
            );

            state = { ...checkout };
            state.status.backdrop = false;
            setCheckout(state);

            if (updatedCart) {
                updatedCart = updatedCart.data.setShippingMethodsOnCart.cart;
                updateFormik(updatedCart);

                const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
                    ...method,
                    label: method.title,
                    value: method.code,
                    image: null,
                }));

                state = { ...checkout };
                state.data.paymentMethod = paymentMethod;
                setCheckout(state);

                manageSummary(updatedCart);
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:problemConnection'),
                });
            }
        }
    };

    const handlePayment = async (val) => {
        const { cart } = checkout.data;
        let state = { ...checkout };
        state.selected.payment = val;
        state.status.backdrop = true;
        setCheckout(state);

        const result = await setPaymentMethod({ variables: { cartId: cart.id, code: val } });

        state = { ...checkout };
        state.status.backdrop = false;
        setCheckout(state);

        if (result) {
            updateFormik(result.data.setPaymentMethodOnCart.cart);
        } else {
            handleOpenMessage({
                variant: 'error',
                text: t('checkout:message:problemConnection'),
            });
        }
    };

    const handlePromo = async () => {
        let cart;
        const state = { ...checkout };
        state.loading.coupon = true;
        setCheckout(state);
        const isApplied = !state.data.isCouponAppliedToCart;

        if (isApplied) {
            const result = await applyCouponTocart({ variables: { cartId: checkout.data.cart.id, coupon: formik.values.coupon } });
            cart = result && result.data.applyCouponToCart.cart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:couponApplied'),
            });
        } else {
            const result = await removeCouponFromCart({ variables: { cartId: checkout.data.cart.id } });
            cart = result && result.data.removeCouponFromCart.cart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:couponRemoved'),
            });
        }

        state.loading.coupon = false;

        if (cart) {
            manageSummary(cart);
            state.data.isCouponAppliedToCart = !state.data.isCouponAppliedToCart;
        } else {
            await formik.setFieldError('coupon', t('checkout:message:couponError'));
        }

        setCheckout(state);
    };

    const handleGift = () => {

    };
    const handleCheckBalance = () => {};

    const handleUsePoint = async () => {

    };

    const handleUseCredit = async () => {

    };

    const snapProcess = () => {
        const snapToken = dataSnap.getSnapTokenByOrderId.snap_token;
        snap.pay(snapToken, {
            onSuccess(result) {
                window.location = '/thanks';
            },
            onPending(result) {
                window.location = '/thanks';
            },
            async onError(result) {
                await getSnapOrderStatusByOrderId({
                    variables: {
                        orderId: checkout.data.orderId,
                    },
                });
                window.location = '/checkout/cart';
            },
            async onClose() {
                await getSnapOrderStatusByOrderId({
                    variables: {
                        orderId: checkout.data.orderId,
                    },
                });
                window.location = '/checkout/cart';
            },
        });
    };

    if (dataSnap) {
        snapProcess();
    }

    const handlePlaceOrder = async () => {
        const { cart, isGuest } = checkout.data;
        let state = { ...checkout };
        let formValidation = {};
        let result;

        await formik.submitForm();
        formValidation = await formik.validateForm();

        if (_.isEmpty(formValidation)) {
            state.loading.order = true;
            setCheckout(state);

            if (isGuest) {
                const setEmailAddress = await setGuestEmailAddressOnCart({ variables: { cartId: cart.id, email: formik.values.email } });
            }

            result = await placeOrder({ variables: { cartId: cart.id } });

            state = { ...checkout };
            state.loading.order = false;
            setCheckout(state);

            if (result) {
                dispatch(setCountCart(0));
                await removeCartId();

                if (checkout.selected.payment.match(/snap.*/)) {
                    const orderId = result.data.placeOrder.order.order_number;
                    await getSnapToken({ variables: { orderId } });
                } else {
                    handleOpenMessage({
                        variant: 'success',
                        text: t('checkout:message:placeOrder'),
                    });
                    Routes.push('/thanks');
                }
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:serverError'),
                });
            }
        } else {
            const msg = checkout.data.isGuest
                ? t('checkout:message:guestFormValidation')
                : t('checkout:message:customerFormValidation');
            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
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
                    street,
                    firstname: address.firstname,
                    lastname: address.lastname,
                    postcode: address.postcode,
                    telephone: address.telephone,
                }
                : {};
        }

        let content;

        if (loading.addresses || loading.all) {
            content = 'Loading';
        } else if (data.isGuest && !address) {
            content = t('checkout:message:address:add');
        } else if (address) {
            content = `${address.firstname} ${address.lastname} ${street} 
            ${address.city} ${address.region.label} ${address.postcode} ${address.telephone}`;
        } else {
            content = t('checkout:message:address:default');
        }

        return (
            <div className={styles.addressContainer}>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:shippingAddress')}
                    </Typography>
                    <Typography variant="p">{content}</Typography>
                </div>
                <div>
                    <AddressFormDialog
                        {...dialogProps}
                        t={t}
                        onSubmitAddress={async (dataAddress, type) => {
                            const { cart } = checkout.data;
                            let state = { ...checkout };

                            await setAddress(dataAddress, cart);
                            state.status.addresses = true;
                            setCheckout(state);

                            _.delay(() => {
                                state = { ...checkout };
                                state.status.openAddressDialog = false;
                                setCheckout(state);
                                state.status.addresses = false;
                                setCheckout(state);
                            }, CLOSE_ADDRESS_DIALOG);
                        }}
                        loading={checkout.loading.addresses}
                        success={checkout.status.addresses}
                        open={checkout.status.openAddressDialog}
                        disableDefaultAddress
                        setOpen={() => setCheckout({
                            ...checkout,
                            status: {
                                ...checkout.status,
                                openAddressDialog: false,
                            },
                        })}
                    />
                    {loading.addresses || loading.all ? null : (
                        <Button
                            variant="outlined"
                            href={data.isGuest ? null : '/customer/account/address'}
                            onClick={
                                data.isGuest
                                    ? () => {
                                        setCheckout({
                                            ...checkout,
                                            status: {
                                                ...checkout.status,
                                                openAddressDialog: true,
                                            },
                                        });
                                    }
                                    : null
                            }
                        >
                            <Typography variant="p" type="bold" letter="uppercase">
                                {data.isGuest && !address
                                    ? t('common:button:addAddress')
                                    : t(_.isNull(address) ? 'common:button:manage' : 'common:button:change')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </div>
        );
    };

    const getRenderShipping = () => {
        let content;
        const { loading, data, selected } = checkout;

        if (loading.shipping || loading.addresses || loading.all) {
            content = <Typography variant="p">Loading</Typography>;
        } else if (data.shippingMethods.length !== 0) {
            content = (
                <Radio
                    value={selected.shipping}
                    onChange={handleShipping}
                    classContainer={styles.listShipping}
                    CustomItem={DeliveryItem}
                    valueData={data.shippingMethods}
                />
            );
        } else {
            content = <Typography variant="p">{t('checkout:noShipping')}</Typography>;
        }

        return content;
    };

    const getRenderPayment = () => {
        let content;
        const { loading, data, selected } = checkout;

        if (loading.payment || loading.shipping || loading.all) {
            content = <Typography variant="p">Loading</Typography>;
        } else if (data.paymentMethod.length !== 0) {
            content = (
                <>
                    <Typography variant="p">{t('checkout:paymentSubtitle')}</Typography>
                    <Radio
                        value={selected.payment}
                        onChange={handlePayment}
                        valueData={data.paymentMethod}
                        CustomItem={DeliveryItem}
                        propsItem={{
                            borderBottom: false,
                            RightComponent: true,
                        }}
                    />
                </>
            );
        } else {
            content = <Typography variant="p">{t('checkout:noPayment')}</Typography>;
        }

        return content;
    };

    return (
        <div className={styles.root}>
            <Message
                open={checkout.data.message.open}
                variant={checkout.data.message.variant}
                setOpen={handleOpenMessage}
                message={checkout.data.message.text}
            />
            <Backdrop open={checkout.status.backdrop} />
            <div className={styles.container}>
                {checkout.data.isGuest ? (
                    <div className={styles.block}>
                        <Typography variant="title" type="bold" letter="uppercase">
                            {t('checkout:emailAddress')}
                        </Typography>
                        <div style={{ margin: '5px' }}>
                            <FormControl
                                fullWidth
                                error={!!(formik.touched.email && formik.errors.email)}
                                style={{ marginTop: '10px', marginBottom: '20px' }}
                            >
                                <Input
                                    name="email"
                                    placeholder="john.doe@gmail.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    endAdornment={(
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-describedby={id}
                                                aria-label="toggle password visibility"
                                                onClick={(event) => {
                                                    setAnchorEl(event.currentTarget);
                                                }}
                                            >
                                                <Help />
                                            </IconButton>
                                            <Popover
                                                id={id}
                                                open={open}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                onClose={() => {
                                                    setAnchorEl(null);
                                                }}
                                            >
                                                <Typography variant="p">
                                                    {t('checkout:emailHelper')}
                                                </Typography>
                                            </Popover>
                                        </InputAdornment>
                                    )}
                                />
                                {formik.touched.email && formik.errors.email ? <FormHelperText>{formik.errors.email || null}</FormHelperText> : null}
                            </FormControl>
                        </div>
                        <Typography variant="p" type="regular" decoration="underline">
                            <Link href="/customer/account/login">{t('checkout:haveAccount')}</Link>
                        </Typography>
                    </div>
                ) : null}
                <div className={styles.block}>{getRenderAddress()}</div>
                <div className={styles.block}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:deliveryMethod')}
                    </Typography>
                    {getRenderShipping()}
                </div>
                <div className={styles.block}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:payment')}
                    </Typography>
                    <div>{getRenderPayment()}</div>
                </div>
                <div className={classNames(styles.block, styles.rmBorder)}>
                    <FieldPoint
                        id="coupon"
                        placeholder={t('checkout:promoCodePlaceholder')}
                        action={handlePromo}
                        onChange={formik.handleChange}
                        value={formik.values.coupon}
                        disabled={checkout.data.isCouponAppliedToCart || checkout.loading.coupon}
                        loading={checkout.loading.coupon}
                        error={!!formik.errors.coupon}
                        errorMessage={formik.errors.coupon}
                    />
                    <FieldPoint placeholder={t('checkout:giftCartPlaceholder')} action={handleGift} />
                    <Button variant="text" className={styles.btnBalanceGift}>
                        <Typography variant="p" decoration="underline" letter="capitalize">
                            {t('checkout:checkBalance')}
                        </Typography>
                    </Button>
                    <div className={styles.cardPoint}>
                        <div className="column">
                            <Typography variant="span" letter="capitalize">
                                {t('checkout:myPoint:title')}
                            </Typography>
                            <Typography variant="title" type="bold" className={styles.pointText}>
                                {checkout.data.point.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </Typography>
                        </div>
                        <div>
                            <Button variant="outlined" className={styles.btnPoint} onClick={handleUsePoint}>
                                <Typography variant="p" type="bold" letter="uppercase">
                                    {t('checkout:myPoint:button')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                    <div className={styles.cardPoint}>
                        <div className="column">
                            <Typography variant="span" letter="capitalize">
                                {t('checkout:myCredit:title')}
                            </Typography>
                            <Typography variant="title" type="bold" className={styles.pointText}>
                                {checkout.data.credit.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </Typography>
                        </div>
                        <div>
                            <Button variant="outlined" className={styles.btnPoint} onClick={handleUseCredit}>
                                <Typography variant="p" type="bold" letter="uppercase" align="center">
                                    {t('checkout:myCredit:button')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Summary
                {...props}
                data={checkout.data.summary}
                total={checkout.data.total}
                loading={checkout.loading.order}
                disabled={checkout.loading.all}
                onClick={handlePlaceOrder}
            />
        </div>
    );
};

export default Checkout;
