import React, { useState } from 'react';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { useDispatch } from 'react-redux';
import { setCountCart } from '@stores/actions/cart';
import { removeCartId } from '@helpers/cartId';
import Routes from 'next/router';
import _ from 'lodash';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    CircularProgress,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { formatPrice } from '@helpers/currency';
import useStyles from './style';
import gqlService from '../../services/graphql';

const Summary = ({
    t,
    checkout,
    setCheckout,
    handleOpenMessage,
    formik,
    updateFormik,
}) => {
    const { order: loading, all: disabled } = checkout.loading;
    const dispatch = useDispatch();
    const styles = useStyles();
    const [expanded, setExpanded] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [setGuestEmailAddressOnCart] = gqlService.setGuestEmailAddressOnCart(({ onError: () => {} }));
    const [getSnapToken, { data: dataSnap }] = gqlService.getSnapToken({ onError: () => {} });
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => {} });
    const [placeOrder] = gqlService.placeOrder({ onError: () => {} });
    const [getSnapOrderStatusByOrderId] = gqlService.getSnapOrderStatusByOrderId({ onError: () => {} });

    const validateReponse = (response, parentState) => {
        const state = parentState;
        if ((response && response.errors) || !response) {
            state.loading.order = false;
            setCheckout(state);

            handleOpenMessage({
                variant: 'error',
                text: t('checkout:message:serverError'),
            });

            return false;
        }

        return true;
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handlePlaceOrder = async () => {
        const { cart, isGuest } = checkout.data;
        let state = { ...checkout };
        let formValidation = {};
        let result;

        state.loading.order = true;
        setCheckout(state);

        if (cart.prices.grand_total.value === 0 && (cart.selected_payment_method && cart.selected_payment_method.code !== 'free')) {
            result = await setPaymentMethod({ variables: { cartId: cart.id, code: 'free' } });

            if (!validateReponse(result, state)) {
                return;
            }

            state.data.cart = result.data.setPaymentMethodOnCart.cart;
            setCheckout(state);
            updateFormik(result.data.setPaymentMethodOnCart.cart);
        }

        await formik.submitForm();
        formValidation = await formik.validateForm();

        if (_.isEmpty(formValidation)) {
            if (isGuest) {
                result = await setGuestEmailAddressOnCart({ variables: { cartId: cart.id, email: formik.values.email } });

                if (!validateReponse(result, state)) {
                    return;
                }
            }

            result = await placeOrder({ variables: { cartId: cart.id } });

            state = { ...checkout };
            state.loading.order = false;
            setCheckout(state);

            if (!validateReponse(result, state)) {
                return;
            }

            const orderNumber = result.data.placeOrder.order.order_number;
            dispatch(setCountCart(0));
            await removeCartId();

            if (checkout.data.cart.selected_payment_method.code.match(/snap.*/)) {
                setOrderId(orderNumber);
                await getSnapToken({ variables: { orderId: orderNumber } });
            } else {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:placeOrder'),
                });
                Routes.push({ pathname: '/thanks', query: { order_id: orderNumber } });
            }
        } else {
            state.loading.order = false;
            setCheckout(state);

            const msg = checkout.data.isGuest
                ? t('checkout:message:guestFormValidation')
                : t('checkout:message:customerFormValidation');

            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    };

    if (dataSnap && orderId) {
        const snapToken = dataSnap.getSnapTokenByOrderId.snap_token;
        snap.pay(snapToken, {
            onSuccess() {
                Routes.push({ pathname: '/thanks', query: { order_id: orderId } });
            },
            onPending() {
                Routes.push({ pathname: '/thanks', query: { order_id: orderId } });
            },
            async onError() {
                await getSnapOrderStatusByOrderId({
                    variables: {
                        orderId,
                    },
                });
                setOrderId(null);
                Routes.push('/checkout/cart');
            },
            async onClose() {
                await getSnapOrderStatusByOrderId({
                    variables: {
                        orderId,
                    },
                });
                setOrderId(null);
                Routes.push('/checkout/cart');
            },
        });
    }

    // Start - Manage Summary
    let data = [];
    let total = 0;
    if (checkout.data.cart) {
        const {
            prices,
            items,
            shipping_addresses,
            applied_store_credit,
            applied_giftcard,
        } = checkout.data.cart;

        const [firstItem] = items;
        const globalCurrency = firstItem.prices.row_total.currency;

        if (items) {
            const sumTotalItem = items.reduce(
                (prev, curr) => ({
                    value: prev.value + curr.prices.row_total.value,
                    currency: curr.prices.row_total.currency,
                }),
                { value: 0 },
            );
            const subtotal = formatPrice(sumTotalItem.value, sumTotalItem.currency);
            total = prices.grand_total;
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

            if (applied_store_credit.is_use_store_credit) {
                const price = formatPrice(Math.abs(applied_store_credit.store_credit_amount), globalCurrency);
                data.push({ item: `Store Credit - ${price}`, value: `-${price}` });
            }

            if (applied_giftcard) {
                const giftCards = applied_giftcard.giftcard_detail.map((item) => {
                    const price = formatPrice(Math.abs(item.giftcard_amount_used), globalCurrency);
                    return { item: `Gift Card (${item.giftcard_code}) - ${price}`, value: `-${price}` };
                });
                data = data.concat(giftCards);
            }
        }
    }
    // End - Manage Summary

    return (
        <div className={styles.footer}>
            <ExpansionPanel expanded={expanded === 1} onChange={handleChange(1)} className={styles.expand}>
                <ExpansionPanelSummary
                    classes={{
                        root: styles.expanHead,
                        expanded: styles.expandHeadOpen,
                    }}
                >
                    {expanded === 1 ? <ExpandLess /> : <ExpandMore />}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={styles.expanBody}>
                    {data.map((list, index) => (
                        <div className={styles.listSummary} key={index}>
                            <Typography variant="span" letter="capitalize">
                                {list.item}
                            </Typography>
                            <Typography variant="span" letter="uppercase">
                                {list.value}
                            </Typography>
                        </div>
                    ))}
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <div className={styles.listSummary}>
                <Typography variant="title" type="bold" letter="capitalize">
                    Total
                </Typography>
                <Typography variant="title" type="bold" letter="uppercase">
                    {total.currency ? formatPrice(total.value, total.currency) : null}
                </Typography>
            </div>
            <Button onClick={handlePlaceOrder} className={styles.btnSave} disabled={loading || disabled}>
                {t('checkout:placeOrder')}
                {loading && (
                    <CircularProgress
                        className={styles.mediumCircular}
                        size={24}
                    />
                )}
            </Button>
        </div>
    );
};

export default Summary;
