/* eslint-disable comma-dangle */

import { useState } from 'react';
// import { getStoreHost } from '@helper_config';
// import { getAppEnv } from '@root/core/helpers/env';

const useTravelokaPay = (data = {}) => {
    // prettier-ignore
    const {
        t, travelokaPayRef, config, handleOpenMessage, checkout, setCheckout,
    } = data;
    const [open, setOpen] = useState(false);
    const [cardToken, setCardToken] = useState('');
    const state = { ...checkout };

    const handleClose = () => {
        setOpen(false);
    };

    const generatesuccessRedirect = (orderNumber) => {
        if (config && config.successRedirect && config.successRedirect.link) {
            return `${config.successRedirect.link}${config.successRedirect.orderId ? `?orderId=${orderNumber}` : ''}`;
        }
        return '/checkout/onepage/success';
    };

    const generateCartRedirect = (orderNumber = '') => {
        if (config && config.cartRedirect && config.cartRedirect.link) {
            if (orderNumber && orderNumber !== '') {
                // return `${getStoreHost(getAppEnv())}snap/payment/fail?order_id=${orderNumber}`;
                return `http://localhost:3000/checkout/cart?paymentFailed=true&orderId=${orderNumber}`;
            }
            return config.cartRedirect.link;
        }
        return '/checkout/cart';
    };

    const handleTravelokaPay = (orderNumber = '') => {
        const { cardNumber, cvv, expiryDate } = travelokaPayRef.current.values;
        // console.log('useTravelokapayRef', travelokaPayRef);
        const expiryDatas = expiryDate.split('/');
        state.loading.order = true;

        const xenditResponseHandler = (err, creditCardCharge) => {
            if (err) {
                // Show the errors on the form
                handleOpenMessage({
                    variant: 'error',
                    text: err.message || '',
                });
                return;
            }
            // console.log(creditCardCharge);

            if (creditCardCharge.status === 'VERIFIED') {
                const token = creditCardCharge.id;
                setCardToken(token);
                handleClose();
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:placeOrder'),
                });

                // window.location.replace(generateCartRedirect(orderNumber));
                window.location.replace(generatesuccessRedirect(orderNumber));
            } else if (creditCardCharge.status === 'IN_REVIEW') {
                const authenticationUrl = creditCardCharge.payer_authentication_url;
                setCardToken(authenticationUrl);
                setOpen(true);

                window.open(creditCardCharge.payer_authentication_url, 'sample-inline-frame');
            } else if (creditCardCharge.status === 'FAILED') {
                setCardToken(creditCardCharge.failure_reason);
                state.loading.order = false;
                setCheckout(state);

                const msg = t('checkout:message:serverError');
                handleOpenMessage({
                    variant: 'error',
                    text: msg,
                });
                window.location.replace(generateCartRedirect(orderNumber));
            }
        };

        window.Xendit.card.createToken(
            {
                amount: checkout.data.cart.prices.grand_total.value, // 100000
                card_number: cardNumber, // 4000000000000002
                card_exp_month: expiryDatas[0], // 12
                card_exp_year: `20${expiryDatas[1]}`, // 2025
                card_cvn: cvv, // 123
                is_multiple_use: false,
            },
            // {
            //     amount: '100000',
            //     card_number: '4000000000000002',
            //     card_exp_month: '12',
            //     card_exp_year: '2025',
            //     card_cvn: '123',
            //     is_multiple_use: false,
            // },
            xenditResponseHandler
        );
    };

    return {
        open,
        setOpen,
        handleClose,
        handleTravelokaPay,
        cardToken,
        setCardToken
    };
};

export default useTravelokaPay;
