/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
/* eslint-disable no-unused-expressions */
import Typography from '@components/Typography';
import Button from '@components/Button';
import Radio from '@components/Forms/Radio';
import TextField from '@components/Forms/TextField';
import classNames from 'classnames';
import DeliveryItem from './RadioDeliveryItem';

import useStyles from '../style';
import Summary from './Summary';
import gqlService from '../services/graphql';
import Routes from 'next/router';
import _ from 'lodash'

const deliveryData = [
    { label: 'Standart', value: { name: 'standart', price: 20000 } },
    { label: 'Express', value: { name: 'express', price: 35000 } },
];

const FieldPoint = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    action,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.fieldPoinContainer}>
            <TextField value={value} onChange={onChange} placeholder={placeholder} />
            <Button variant="outlined" className={styles.btnAplly} onClick={action}>
                <Typography variant="p" type="bold" letter="uppercase">
                    Aplly
                </Typography>
            </Button>
        </div>
    );
};

const Checkout = (props) => {
    const { t, token } = props;
    const styles = useStyles();
    const [delivery, setDelivery] = useState([]);
    const [payment, setPayment] = React.useState([]);
    const [summary, setSummary] = useState([
        { item: 'sub total', value: 300000 },
    ]);
    const [point, setPoint] = useState(100000);
    const [credit, setCredit] = useState(100000);
    const getCustomer = gqlService.getCustomer(null, token);
    const getCustomerCart = gqlService.getCustomerCart(null, token);
    const [setShippingAddressById] = gqlService.setShippingAddress(null, token);
    const [setShippingMethod] = gqlService.setShippingMethod(null, token);
    const [setBillingAddressById] = gqlService.setBillingAddressById(null, token);
    const [setPaymentMethod] = gqlService.setPaymentMethod(null, token);
    const [placeOrder] = gqlService.placeOrder(null, token);
    
    const [checkout, setCheckout] = useState({
        data: {
            cart: null,
            customer: null,
            shippingMethods: [],
            summary: [],
            paymentMethod: [],
            total: 0
        },
        selected: {
            address: null,
            shipping: {
                name: { carrier_code: null, method_code: null },
                price: null
            },
            payment: null,
            billing: null
        },
        loading: {
            addresses: false,
            shipping: false,
            payment: false,
            billing: false,
            order: false,
            summary: false
        }
    });
    
    useEffect(() => {
        if (!getCustomer.loading && !getCustomerCart.loading) {
            const cart = getCustomerCart.data.customerCart;

            if(cart.items.length == 0){
                return window.location = '/cart'
            }
            const customer = getCustomer.data.customer;
            const [address] = customer.addresses.filter((address) => {
                return address.default_shipping;
            });
            const summary = [
                { item: 'sub total', value: cart.prices.grand_total.value },
            ];
            const shipping = cart.shipping_addresses[0];            
            const state = { ...checkout };
            state.data.customer = customer;
            state.data.cart = cart;
            state.data.summary = summary;
            state.data.total = cart.prices.grand_total.value

            if(shipping){
                if(cart.billing_address){
                    state.selected.address = {
                        firstname: address.firstname, 
                        lastname: address.lastname,
                        city: address.city,
                        region:{
                            region: address.region.label
                        },
                        postcode: address.postcode,
                        telephone: address.telephone,
                        street: address.street
                    }
                }

                if(shipping.available_shipping_methods){
                    const availableShipping = shipping.available_shipping_methods.filter(x => x.available)
                    state.data.shippingMethods = availableShipping.map((shipping) => {
                        return {
                            ...shipping,
                            label: `${shipping.method_title} ${shipping.carrier_title}`,
                            value: {
                                name: { carrier_code: shipping.carrier_code, method_code: shipping.method_code },
                                price: shipping.amount.value
                            }
                        }
                    });
                }

                if(!_.isNull(shipping.selected_shipping_method)){
                    const shippingMethod = shipping.selected_shipping_method
                    state.selected.shipping = {
                        name: { carrier_code: shippingMethod.carrier_code, method_code: shippingMethod.method_code },
                        price: shippingMethod.amount.value
                    }
                    state.data.paymentMethod = cart.available_payment_methods.map((method) => ({
                        ...method,
                        label: method.title,
                        value: method.code,
                        image: null
                    }))
                }

                if(cart.selected_payment_method){
                    state.selected.payment = cart.selected_payment_method.code
                }
            }

            setCheckout(state);

            if(!shipping){
                setAdrress(address, cart);
            }
        }
    }, [getCustomer, getCustomerCart]);

    const setAdrress = async (address, cart) => {
        const state = { ...checkout };
        const resultShippingAddress = await setShippingAddressById({
            variables: {
                cartId: cart.id,
                addressId: address.id
            }
        });

        await setBillingAddressById({
            variables: {
                cartId: cart.id,
                addressId: address.id
            }
        });

        const shippingMethods = resultShippingAddress.data.setShippingAddressesOnCart.cart
            .shipping_addresses[0].available_shipping_methods.map((shipping) => {
                return {
                    ...shipping,
                    label: `${shipping.method_title} ${shipping.carrier_title}`,
                    value: {
                        name: { carrier_code: shipping.carrier_code, method_code: shipping.method_code },
                        price: shipping.amount.value
                    }
                }
            });

        state.data.shippingMethods = shippingMethods
        state.selected.address = address

        setCheckout(state)
    }

    const handleAddres = () => {};
    
    const handleShipping = async (val) => {
        const { cart, summary } = checkout.data;
        const { carrier_code, method_code } = val.name
        setCheckout({
            ...checkout,
            selected: {
                ...checkout.selected,
                shipping: val
            }
        })
        const updatedCart = (
            await setShippingMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: carrier_code,
                    methodCode: method_code
                }
            })
        ).data.setShippingMethodsOnCart.cart

        const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
            ...method,
            label: method.title,
            value: method.code,
            image: null
        }))

        let include = false;
        const newData = [];
        summary.forEach((item) => {
            if (item.item === 'shipping') {
                include = true;
                // eslint-disable-next-line no-param-reassign
                item.value = val.price;
            }
            newData.push(item);
        });

        include === false
            ? setCheckout({
                ...checkout,
                data: {
                    ...checkout.data,
                    summary: [...newData, { item: 'shipping', value: val.price }],
                    paymentMethod,
                    total: updatedCart.prices.grand_total.value
                },
                selected: {
                    ...checkout.selected,
                    shipping: val
                }
            })  
            : setCheckout({
                ...checkout,
                data: {
                    ...checkout.data,
                    summary:newData,
                    paymentMethod,
                    total: updatedCart.prices.grand_total.value
                },
                selected: {
                    ...checkout.selected,
                    shipping: val
                }
            })  
    };

    const handlePayment = async (val) => {
        const { cart } = checkout.data
        setCheckout({
            ...checkout,
            selected: {
                ...checkout.selected,
                payment: val
            }
        });

        const result = await setPaymentMethod({variables: {cartId: cart.id, code: val}})
    };

    const handlePromo = () => {
        let include = false;
        const newData = [];
        summary.forEach((item) => {
            if (item.item === 'promo') {
                include = true;
                // eslint-disable-next-line no-param-reassign
                item.value = -20000;
            }
            newData.push(item);
        });

        include === false
            ? setSummary([...newData, { item: 'promo', value: -20000 }])
            : setSummary(newData);
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

        include === false
            ? setSummary([...newData, { item: 'gift', value: -30000 }])
            : setSummary(newData);
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

            include === false
                ? await setSummary([...newData, { item: 'point', value: -point }])
                : await setSummary(newData);

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

            include === false
                ? await setSummary([...newData, { item: 'credit', value: -credit }])
                : await setSummary(newData);

            setCredit(0);
        }
    };

    const handlePlaceOrder = async () => {
        const { cart } = checkout.data;
        const incrementId = await placeOrder({variables: {cartId: cart.id}})
        console.log(incrementId);
        Routes.push('/thanks')
    }

    const getRenderAddress = () => {
        const { address } = checkout.selected;
        const street = _.isNull(address) ? null: address.street.join(' ')

        return (
            <div className={styles.addressContainer}>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:shippingAddress')}
                    </Typography>
                    {_.isNull(address) ? (
                        <Typography variant="p">
                            loading
                        </Typography>
                    ) : (
                        <Typography variant="p">
                            {`${address.firstname} ${address.lastname} ${street} ${address.city} ${address.region.region} ${address.postcode} ${address.telephone}`}
                        </Typography>
                    )}
                </div>
                {_.isNull(address) ? null : (
                    <Button variant="outlined" href={`/customer/account/address?token=${token}`}>
                        <Typography variant="p" type="bold" letter="uppercase">
                            {t('common:button:change')}
                        </Typography>
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.block}>
                    {getRenderAddress()}
                </div>
                <div className={styles.block}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:deliveryMethod')}
                    </Typography>
                    {checkout.data.shippingMethods.length === 0 ? (
                        'LOADING'
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
                    <FieldPoint placeholder="Promo Code" action={handlePromo} />
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
                            <Typography
                                variant="title"
                                type="bold"
                                className={styles.pointText}
                            >
                                {point.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            className={styles.btnPoint}
                            onClick={handleUsePoint}
                        >
                            <Typography variant="p" type="bold" letter="uppercase">
                                USE MY POIN
                            </Typography>
                        </Button>
                    </div>
                    <div className={styles.cardPoint}>
                        <div className="column">
                            <Typography variant="span" letter="capitalize">
                                My Credit
                            </Typography>
                            <Typography
                                variant="title"
                                type="bold"
                                className={styles.pointText}
                            >
                                {credit.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            className={styles.btnPoint}
                            onClick={handleUseCredit}
                        >
                            <Typography
                                variant="p"
                                type="bold"
                                letter="uppercase"
                                align="center"
                            >
                                use my credit
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
            {<Summary {...props} data={checkout.data.summary} total={checkout.data.total} onClick={handlePlaceOrder} />}
        </div>
    );
};

export default Checkout;
