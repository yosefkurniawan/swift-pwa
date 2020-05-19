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
    summary,
}) => {
    const { order: loading, all: disabled } = checkout.loading;
    const dispatch = useDispatch();
    const styles = useStyles();
    const [expanded, setExpanded] = useState(null);
    const [setGuestEmailAddressOnCart] = gqlService.setGuestEmailAddressOnCart();
    const [getSnapToken, { data: dataSnap }] = gqlService.getSnapToken({ onError: () => {} });
    const [placeOrder] = gqlService.placeOrder({ onError: () => {} });
    const [getSnapOrderStatusByOrderId] = gqlService.getSnapOrderStatusByOrderId({ onError: () => {} });

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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
                await setGuestEmailAddressOnCart({ variables: { cartId: cart.id, email: formik.values.email } });
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

    if (dataSnap) {
        const snapToken = dataSnap.getSnapTokenByOrderId.snap_token;
        snap.pay(snapToken, {
            onSuccess() {
                window.location = '/thanks';
            },
            onPending() {
                window.location = '/thanks';
            },
            async onError() {
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
    }

    // ----
    let data = [];
    let total = 0;
    const {
        prices, items, shipping_addresses,
    } = summary;

    if (items) {
        const sumTotalItem = items.reduce((prev, curr) => ({
            value: prev.value + curr.prices.row_total.value,
            currency: curr.prices.row_total.currency,
        }), { value: 0 });
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
    }

    // ----

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
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -12,
                            marginLeft: -12,
                        }}
                        size={24}
                    />
                )}
            </Button>
        </div>
    );
};

export default Summary;
