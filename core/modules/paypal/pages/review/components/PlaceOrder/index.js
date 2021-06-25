import React from 'react';
import View from '@core_modules/paypal/pages/review/components/PlaceOrder/view';
import { originName, modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';
import { setCheckoutData } from '@helper_cookies';
import { useApolloClient } from '@apollo/client';
import { removeCartId } from '@helper_cartid';
import { localTotalCart } from '@services/graphql/schema/local';
import { setPaypalPaymentMethod } from '@core_modules/paypal/services/graphql';

const PlaceOrder = (props) => {
    const {
        checkout, setCheckout, t, config, initialOptionPaypal,
    } = props;
    const client = useApolloClient();

    let paypalData = {};
    if (typeof window !== 'undefined') {
        paypalData = JSON.parse(localStorage.getItem(modules.checkout.paypal.keyData));
    }

    const [placeOrder] = gqlService.placeOrder({ onError: () => {} });
    const [setPaymentMethod] = setPaypalPaymentMethod();

    const handleOpenMessage = async ({ variant, text }) => {
        const state = { ...checkout };
        window.toastMessage({
            open: true,
            variant,
            text,
        });
        setCheckout(state);
    };

    const generatesuccessRedirect = (orderNumber) => {
        if (config && config.successRedirect && config.successRedirect.link) {
            return `${config.successRedirect.link}${config.successRedirect.orderId ? `?orderId=${orderNumber}` : ''}`;
        }
        return '/checkout/onepage/success';
    };

    const handlePlaceOrder = async () => {
        window.backdropLoader(true);
        const { cart } = checkout;
        let state = { ...checkout };

        state.loading.order = true;
        setCheckout(state);

        const setPayment = await setPaymentMethod({
            variables: {
                cartId: cart.id,
                token: initialOptionPaypal['data-client-token'],
                payerId: paypalData.data.payerID,
            },
        });

        if (setPayment && setPayment.data && setPayment.data.setPaymentMethodOnCart && setPayment.data.setPaymentMethodOnCart.cart) {
            const result = await placeOrder({ variables: { cartId: cart.id, origin: originName } });

            state = { ...checkout };
            state.loading.order = false;
            setCheckout(state);

            let orderNumber = '';
            if (result && result.data && result.data.placeOrder && result.data.placeOrder.order && result.data.placeOrder.order.order_number) {
                orderNumber = result.data.placeOrder.order.order_number;
            }
            if (orderNumber && orderNumber !== '') {
                setCheckoutData({
                    email: cart.email,
                    order_number: orderNumber,
                    order_id: result.data.placeOrder.order.order_id,
                });
                if (client && client.query && typeof client.query === 'function') {
                    await client.query({ query: localTotalCart, data: { totalCart: 0 } });
                }
                await removeCartId();

                window.backdropLoader(true);
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:placeOrder'),
                });
                window.location.replace(generatesuccessRedirect(orderNumber));
            } else {
                window.backdropLoader(true);
                state.loading.order = false;
                setCheckout(state);

                const msg = t('checkout:message:serverError');

                handleOpenMessage({
                    variant: 'error',
                    text: msg,
                });
            }
        } else {
            window.backdropLoader(true);
            state.loading.order = false;
            setCheckout(state);

            const msg = t('checkout:message:serverError');

            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    };
    return (
        <View
            {...props}
            handlePlaceOrder={handlePlaceOrder}
        />
    );
};

export default PlaceOrder;
