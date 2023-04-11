/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';
import React from 'react';
import TagManager from 'react-gtm-module';

export default function CustomizedExpansionPanels({
    checkout,
    setCheckout,
    updateFormik,
    formik,
    handleOpenMessage,
    t,
    config,
    storeConfig,
    PaymentView,
    paypalHandlingProps,
    setInitialOptionPaypal,
    initialOptionPaypal,
    setTokenData,
    travelokaPayRef,
    stripeRef,
    clientSecret,
    setClientSecret,
    displayHowToPay,
    setDisplayHowToPay,
    checkoutTokenState,
    setCheckoutTokenState,
    refSummary,
}) {
    const { loading, data, selected } = checkout;
    const [setPaymentMethod] = gqlService.setPaymentMethod();
    const [getStripePaymentIntent] = gqlService.getStripePaymentIntent();
    const { data: paymentMethodList } = gqlService.getCheckoutConfigurations();
    const [getPaypalToken, paypalTokenData] = gqlService.createPaypalExpressToken();

    /**
     * [METHOD] handle when get result from set payment method
     * @param {state, result, val, cart} params
     */
    const onHandleResult = ({
        state, result, val, cart, purchaseOrder = false,
    }) => {
        state = {
            ...checkout,
            selected: {
                ...checkout.selected,
                paymentOrderNumber: null,
            },
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
                purchaseOrderNumber: false,
            },
        };

        if (result && result.data && result.data.setPaymentMethodOnCart && result.data.setPaymentMethodOnCart.cart) {
            const mergeCart = {
                ...state.data.cart,
                ...result.data.setPaymentMethodOnCart.cart,
            };
            state.data.cart = mergeCart;
            state.status.purchaseOrderApply = true;
            updateFormik(mergeCart);
        } else {
            state.selected.payment = null;
            if (result.message.includes('Token is wrong.')) {
                setCheckoutTokenState(!checkoutTokenState);
            } else if (purchaseOrder) {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:purchaseOrderFailed'),
                });
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:emptyShippingError'),
                });
            }
        }

        setCheckout(state);

        const selectedPayment = data.paymentMethod.filter((item) => item.code === val);
        // GTM UA dataLayer
        const dataLayer = {
            event: 'checkout',
            ecommerce: {
                checkout: {
                    actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout' },
                    products: cart.items.map(({ quantity, product, prices }) => ({
                        name: product.name,
                        id: product.sku,
                        price: JSON.stringify(prices.price.value),
                        category: product.categories.length > 0 ? product.categories[0].name : '',
                        list: product.categories.length > 0 ? product.categories[0].name : '',
                        quantity: JSON.stringify(quantity),
                        dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                        dimension5: '',
                        dimension6: '',
                        dimension7: prices.discount ? 'YES' : 'NO',
                    })),
                },
                currencyCode: storeConfig.base_currency_code || 'IDR',
            },
        };
        const dataLayerOption = {
            event: 'checkoutOption',
            ecommerce: {
                currencyCode: storeConfig.base_currency_code || 'IDR',
                checkout_option: {
                    actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout_option' },
                },
                fbpixels: {
                    total_price: cart.prices.grand_total.value,
                },
            },
        };
        // GA 4 dataLayer
        const dataLayerOpt = {
            event: 'add_payment_info',
            ecommerce: {
                payment_type: selectedPayment[0].title,
                currency: storeConfig.base_currency_code || 'IDR',
                items: [
                    cart.items.map(({ quantity, product, prices }) => ({
                        currency: storeConfig.base_currency_code || 'IDR',
                        item_name: product.name,
                        item_id: product.sku,
                        price: JSON.stringify(prices.price.value),
                        item_category: product.categories.length > 0 ? product.categories[0].name : '',
                        item_list_name: product.categories.length > 0 ? product.categories[0].name : '',
                        quantity: JSON.stringify(quantity),
                        item_stock_status: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                        item_sale_product: '',
                        item_reviews_count: '',
                        item_reviews_score: '',
                    })),
                ],
                fbpixels: {
                    total_price: cart.prices.grand_total.value,
                    content_ids: [
                        {
                            payment_type: selectedPayment[0].title,
                            items: cart.items.map(({ quantity, product, prices }) => ({
                                currency: storeConfig.base_currency_code || 'IDR',
                                item_name: product.name,
                                item_id: product.sku,
                                price: JSON.stringify(prices.price.value),
                                item_category: product.categories.length > 0 ? product.categories[0].name : '',
                                item_list_name: product.categories.length > 0 ? product.categories[0].name : '',
                                quantity: JSON.stringify(quantity),
                                item_stock_status: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                                item_sale_product: '',
                                item_reviews_count: '',
                                item_reviews_score: '',
                            })),
                        },
                    ],
                    catalog_id: cart.items.map(({ product }) => (product.categories.length > 0 ? product.categories[0].name : '')),
                },
            },
        };
        TagManager.dataLayer({ dataLayer });
        TagManager.dataLayer({ dataLayer: dataLayerOption });
        TagManager.dataLayer({ dataLayer: dataLayerOpt });
    };

    /**
     * [METHOD] for set checkout state when selected payment method
     * @param {string: selected_payment_method} val
     */
    const handlePayment = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            let state = {
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
            state.selected.payment = val;
            state.status.purchaseOrderApply = false;
            state.newupdate = true;
            setCheckout(state);

            if (val === 'purchaseorder' && checkout.selected) {
                state = {
                    ...checkout,
                    selected: {
                        ...checkout.selected,
                        payment: val,
                        purchaseOrderNumber: null,
                    },
                    loading: {
                        ...checkout.loading,
                        all: false,
                        order: false,
                    },
                };
                setCheckout(state);
            } else {
                const payment_method = { code: val };
                if (payment_method.code === 'stripe_payments') {
                    await getStripePaymentIntent({
                        variables: {
                            cartId: cart.id,
                        },
                    }).then((resJson) => {
                        setClientSecret(resJson.data.setPaymentIntent.clientSecret);
                        state = {
                            ...checkout,
                            loading: {
                                ...checkout.loading,
                                all: false,
                                shipping: false,
                                payment: false,
                                extraFee: false,
                                order: false,
                            },
                        };
                        setCheckout(state);
                    });
                } else {
                    await setPaymentMethod({
                        variables: {
                            cartId: cart.id,
                            payment_method,
                        },
                    })
                        .then((result) => {
                            if (val === 'paypal_express') {
                                state = {
                                    ...checkout,
                                    selected: {
                                        ...checkout.selected,
                                        payment: val,
                                        purchaseOrderNumber: null,
                                    },
                                    loading: {
                                        ...checkout.loading,
                                        all: false,
                                        order: false,
                                    },
                                };
                                setCheckout(state);
                                if (
                                    storeConfig?.pwa?.paypal_enable
                                    && initialOptionPaypal['data-order-id'] === ''
                                    && checkout.selected.payment === 'paypal_express'
                                ) {
                                    getPaypalToken({
                                        variables: {
                                            cartId: cart.id,
                                            code: 'paypal_express',
                                            returnUrl: modules.paypal.returnUrl,
                                            cancelUrl: modules.paypal.cancelUrl,
                                        },
                                    }).then((res) => {
                                        if (res.data && res.data.createPaypalExpressToken && res.data.createPaypalExpressToken.token) {
                                            const { token } = res.data.createPaypalExpressToken;
                                            setTokenData(res.data.createPaypalExpressToken);
                                            setInitialOptionPaypal({
                                                ...initialOptionPaypal,
                                                'data-order-id': token,
                                            });
                                        }
                                    });
                                }
                            } else {
                                onHandleResult({
                                    state,
                                    result,
                                    val,
                                    cart,
                                });
                            }
                        })
                        .catch((err) => {
                            const result = err;
                            onHandleResult({
                                state,
                                result,
                                val,
                                cart,
                            });
                        });
                }
            }
        }
    };

    /**
     * [METHOD] for handling purchase order text input on change, and set checkout state
     * @param {object} event
     */
    const handlePurchaseOrder = (e) => {
        const state = {
            ...checkout,
            selected: {
                ...checkout.selected,
                purchaseOrderNumber: e.target.value,
            },
        };
        setCheckout(state);
    };

    /**
     * [METHOD] for handling purchase order submit button
     */
    const handlePurchaseOrderSubmit = async () => {
        const { cart } = checkout.data;
        const state = {
            ...checkout,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
                purchaseOrderNumber: true,
            },
        };
        setCheckout(state);

        const selected_payment = state.selected.payment;
        const purchase_order_number = state.selected.purchaseOrderNumber;
        const payment_method = { code: selected_payment, purchase_order_number };
        await setPaymentMethod({
            variables: {
                cartId: cart.id,
                payment_method,
            },
        })
            .then((result) => {
                onHandleResult({
                    state,
                    result,
                    val: selected_payment,
                    cart,
                });
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:purchaseOrderApplied'),
                });
            })
            .catch((err) => {
                const result = err;
                onHandleResult({
                    state,
                    result,
                    val: selected_payment,
                    cart,
                });
            });
    };

    /**
     * [MAIN] view
     */
    return (
        <PaymentView
            t={t}
            data={data}
            loading={loading}
            selected={selected}
            checkout={checkout}
            checkoutTokenState={checkoutTokenState}
            setCheckoutTokenState={setCheckoutTokenState}
            formik={formik}
            updateFormik={updateFormik}
            clientSecret={clientSecret}
            setCheckout={setCheckout}
            storeConfig={storeConfig}
            paymentMethodList={paymentMethodList}
            handlePayment={handlePayment}
            handlePurchaseOrder={handlePurchaseOrder}
            handlePurchaseOrderSubmit={handlePurchaseOrderSubmit}
            paypalTokenData={paypalTokenData}
            paypalHandlingProps={paypalHandlingProps}
            initialOptionPaypal={initialOptionPaypal}
            travelokaPayRef={travelokaPayRef}
            stripeRef={stripeRef}
            handleOpenMessage={handleOpenMessage}
            displayHowToPay={displayHowToPay}
            setDisplayHowToPay={setDisplayHowToPay}
            refSummary={refSummary}
            config={config}
            onHandleResult={onHandleResult}
        />
    );
}
