// import Button from '@common_button';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect } from 'react';

import gqlService from '@core_modules/checkout/services/graphql';

const CheckoutForm = (props) => {
    const {
        checkout, onHandleResult, setCheckout, stripeRef, handleOpenMessage, setStripeState, updateFormik,
    } = props;
    const [setPaymentMethod] = gqlService.setPaymentMethod();
    const stripe = useStripe();
    const elements = useElements();

    const { cart } = checkout.data;

    const handleSubmit = async () => {
        // e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const confirmStripePayments = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (confirmStripePayments.error) {
            console.log(confirmStripePayments.error);
            handleOpenMessage({
                variant: 'error',
                text: confirmStripePayments.error.message,
            });
        } else {
            console.log(confirmStripePayments);
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
                    cc_stripejs_token: confirmStripePayments.paymentIntent.payment_method,
                },
            };
            await setPaymentMethod({
                variables: {
                    cartId: cart.id,
                    payment_method,
                },
            }).then((result) => {
                state.data.cart = {
                    ...state.data.cart,
                    ...result.data.setPaymentMethodOnCart.cart,
                };
                setCheckout(state);
                updateFormik({
                    ...state.data.cart,
                    ...result.data.setPaymentMethodOnCart.cart,
                });
                // onHandleResult({
                //     state,
                //     result,
                //     val: 'stripe_payments',
                //     cart,
                // });
                setStripeState(true);
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

    useEffect(() => {
        if (typeof stripeRef !== 'undefined') {
            stripeRef.current = {
                handleSubmit,
            };
        }
    }, [stripeRef]);

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            {/* Use these button below if you want to manually trigger confirm payment intent */}
            {/* <Button
                fullWidth
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                style={{ marginTop: '1rem' }}
            >
                {isProcessing ? 'Processing ... ' : 'Pay now'}
            </Button> */}
        </form>
    );
};

export default CheckoutForm;
