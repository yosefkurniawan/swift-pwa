import Button from '@common_button';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

import gqlService from '@core_modules/checkout/services/graphql';

const CheckoutForm = (props) => {
    const {
        refSummary, checkout, onHandleResult, setCheckout,
    } = props;
    const [setPaymentMethod] = gqlService.setPaymentMethod();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const { cart } = checkout.data;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const stripeConfirm = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        // if ((error && error.type === 'card_error') || (error && error.type === 'validation_error')) {
        //     setMessage(error.message);
        // } else {
        //     setMessage('An unexpected error occured.');
        // }

        setIsProcessing(false);
        if (refSummary && refSummary.current && stripeConfirm && stripeConfirm.paymentIntent) {
            const state = {
                ...checkout,
                loading: {
                    ...checkout.loading,
                    all: false,
                    shipping: false,
                    payment: false,
                    extraFee: true,
                    order: true,
                },
            };
            state.selected.payment = 'stripe_payments';
            state.status.purchaseOrderApply = false;
            setCheckout(state);
            const payment_method = {
                code: 'stripe_payments',
                stripe_payments: {
                    // cc_stripejs_token: 'pm_card_visa',
                    cc_stripejs_token: stripeConfirm.paymentIntent.payment_method,
                },
            };
            await setPaymentMethod({
                variables: {
                    cartId: cart.id,
                    payment_method,
                },
            }).then((result) => {
                setIsProcessing(false);
                onHandleResult({
                    state,
                    result,
                    val: 'stripe_payments',
                    cart,
                });
                refSummary.current.handlePlaceOrder();
                setMessage('Order success!');
            }).catch((err) => {
                const result = err;
                onHandleResult({
                    state,
                    result,
                    val: 'stripe_payments',
                    cart,
                });
            });
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Button
                fullWidth
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                style={{ marginTop: '1rem' }}
            >
                {isProcessing ? 'Processing ... ' : 'Pay now'}
            </Button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
