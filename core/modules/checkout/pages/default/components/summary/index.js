/* eslint-disable comma-dangle */
/* eslint-disable no-lonely-if */
import { useApolloClient, useReactiveVar } from '@apollo/client';
import { modules } from '@config';
import { removeCartId, setCartId } from '@helper_cartid';
import { getHost, getStoreHost } from '@helper_config';
import { setCheckoutData } from '@helper_cookies';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import { localTotalCart } from '@services/graphql/schema/local';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import { getIpayUrl } from '@core_modules/checkout/helpers/config';
import gqlService from '@core_modules/checkout/services/graphql';
import Skeleton from '@material-ui/lab/Skeleton';
import SummaryPlugin from '@plugin_summary';

import useTravelokaPay from '@core_modules/checkout/helpers/useTravelokaPay';
import ModalXendit from '@core_modules/checkout/pages/default/components/ModalXendit/index';
import Traveloka3DSModal from '@core_modules/checkout/pages/default/components/payment/components/Traveloka3DSModal';
import { getAppEnv } from '@root/core/helpers/env';

const Summary = ({
    t,
    checkout,
    setCheckout,
    handleOpenMessage,
    formik,
    updateFormik,
    config,
    refSummary,
    storeConfig,
    travelokaPayRef,
    checkoutTokenState,
    setCheckoutTokenState,
}) => {
    const { order: loading, all: disabled, totalPrice } = checkout.loading;
    const errorItems = checkout?.data?.errorItems;
    const isSelectedPurchaseOrder = checkout.selected.payment === 'purchaseorder';

    // origin name config
    const originName = modules.checkout.checkoutOnly ? 'pwa-checkout' : 'pwa';

    const globalCurrency = storeConfig.default_display_currency_code;
    // prettier-ignore
    const isPurchaseOrderApply = isSelectedPurchaseOrder && checkout.status.purchaseOrderApply;

    const client = useApolloClient();
    const tempMidtransOrderId = [];
    const [orderId, setOrderId] = useState(null);
    const [snapOrderId, setSnapOrderId] = useState([]);
    const [snapOpened, setSnapOpened] = useState(false);
    const [snapClosed, setSnapClosed] = useState(false);
    const [getSnapToken, manageSnapToken] = gqlService.getSnapToken({ onError: () => {} });
    const [setPaymentMethod] = gqlService.setPaymentMethod();
    const [placeOrder] = gqlService.placeOrder();
    const [placeOrderWithOrderComment] = gqlService.placeOrderWithOrderComment({ onError: () => {} });
    const [getSnapOrderStatusByOrderId, snapStatus] = gqlService.getSnapOrderStatusByOrderId({ onError: () => {} });
    const [getCustCartId, manageCustCartId] = gqlService.getCustomerCartId();
    const storeConfigLocalStorage = useReactiveVar(storeConfigVar);
    // indodana
    const [getIndodanaRedirect, urlIndodana] = gqlService.getIndodanaUrl();
    // xendit
    const [getXenditUrl] = gqlService.xenditCreateInvoice();

    // travelokapay
    const { payment_travelokapay_bin_whitelist, payment_travelokapay_public_key, payment_travelokapay_user_id } = storeConfig;
    const {
        open: openTraveloka, setOpen: setOpenTraveloka, handleClose, handleTravelokaPay,
    } = useTravelokaPay({
        t,
        travelokaPayRef,
        config,
        handleOpenMessage,
        checkout,
        setCheckout,
        payment_travelokapay_user_id,
        payment_travelokapay_bin_whitelist,
    });

    // mutation update delete
    const [actDeleteItem] = gqlService.deleteItemCart();
    const [actUpdateItem] = gqlService.updateItemCart();
    const [getUpdatedCart, updatedCart] = gqlService.getUpdatedCart();

    const validateResponse = (response, parentState) => {
        const state = parentState;
        if (response.message) {
            state.loading.order = false;
            setCheckout(state);

            if (response.message.includes('Token is wrong.')) {
                setCheckoutTokenState(!checkoutTokenState);
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:serverError'),
                });
            }

            return false;
        }

        return true;
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
                if (originName === 'pwa-checkout') {
                    return `${getStoreHost(getAppEnv())}snap/payment/fail?order_id=${orderNumber}`;
                }
                return `${getHost()}/checkout/cart?paymentFailed=true&orderId=${orderNumber}`;
            }
            return config.cartRedirect.link;
        }
        return '/checkout/cart';
    };

    // place order xendit
    const [openXendit, setOpenXendit] = useState(false);
    const [xenditIframeUrl, setXenditIframeUrl] = useState('');
    const [xenditState, setXenditState] = useState({});

    const handleXendit = (order_id) => {
        const state = { ...checkout };
        state.loading.order = true;
        setCheckout(state);
        getXenditUrl({
            variables: { order_id },
        })
            .then((res) => {
                if (res && res.data && res.data.xenditCreateInvoice && res.data.xenditCreateInvoice.invoice_url) {
                    setXenditIframeUrl(res.data.xenditCreateInvoice.invoice_url);
                    setXenditState({
                        order_id,
                        payment_code: checkout.data.cart.selected_payment_method.code,
                        mode: res.data.xenditCreateInvoice.mode,
                        xendit_qrcode_external_id: res.data.xenditCreateInvoice.xendit_qrcode_external_id,
                        amount: checkout.data.cart.prices.grand_total.value,
                    });
                    if (modules.checkout.xendit.paymentPrefixCodeOnSuccess.includes(checkout.data.cart.selected_payment_method.code)) {
                        handleOpenMessage({
                            variant: 'success',
                            text: t('checkout:message:placeOrder'),
                        });
                        window.location.replace(generatesuccessRedirect(order_id));
                    } else if (checkout.data.cart.selected_payment_method.code === 'cc_subscription') {
                        window.location.replace(res.data.xenditCreateInvoice.invoice_url);
                    } else {
                        setOpenXendit(true);
                    }

                    state.loading.order = false;
                    setCheckout(state);
                } else {
                    state.loading.order = false;
                    setCheckout(state);

                    const msg = t('checkout:message:serverError');

                    handleOpenMessage({
                        variant: 'error',
                        text: msg,
                    });

                    setTimeout(() => {
                        window.location.replace(generateCartRedirect(orderId));
                    }, 1000);
                }
            })
            .catch((e) => {
                state.loading.order = false;
                setCheckout(state);

                const msg = e.graphQLErrors.length > 0 ? e.graphQLErrors[0].message : t('checkout:message:serverError');

                handleOpenMessage({
                    variant: 'error',
                    text: msg,
                });

                setTimeout(() => {
                    window.location.replace(generateCartRedirect(order_id));
                }, 1000);
            });
    };

    const handlePlaceOrder = async () => {
        const { cart, isGuest } = checkout.data;
        let state = { ...checkout };
        let formValidation = {};
        let result;

        state.loading.order = true;
        setCheckout(state);

        if (cart.prices.grand_total.value === 0 && cart.selected_payment_method && cart.selected_payment_method.code !== 'free') {
            state = { ...checkout };
            await setPaymentMethod({
                variables: {
                    cartId: cart.id,
                    payment_method: {
                        code: 'free',
                    },
                },
            })
                .then((res) => {
                    result = res;
                })
                .catch((err) => {
                    result = err;
                });

            if (!validateResponse(result, state)) return;

            state.data.cart = {
                ...state.data.cart,
                ...result.data.setPaymentMethodOnCart.cart,
            };
            setCheckout(state);
            updateFormik({
                ...state.data.cart,
                ...result.data.setPaymentMethodOnCart.cart,
            });
        }

        await formik.submitForm();
        formValidation = await formik.validateForm();

        if (checkout.data.cart.selected_payment_method.code.match(/travelokapay/)) {
            window.Xendit.setPublishableKey(payment_travelokapay_public_key);

            const {
                values: { cardNumber, cvv, expiryDate },
            } = travelokaPayRef.current;
            const expiryDatas = expiryDate.split('/');
            const errorMessages = [];

            travelokaPayRef.current.submitForm();
            const travelokaValidateForm = await travelokaPayRef.current.validateForm();
            if (Object.keys(travelokaValidateForm).length > 0) {
                handleOpenMessage({
                    variant: 'error',
                    text: Object.values(travelokaValidateForm),
                });
                state.loading.order = false;
                setCheckout(state);
                return;
            }

            if (!window.Xendit.card.validateCardNumber(cardNumber)) {
                travelokaPayRef.current.setFieldError(
                    'cardNumber',
                    `${t('checkout:travelokaPay:validation:cardNumber')} ${t('checkout:travelokaPay:validation:invalid')}`,
                );
                errorMessages.push(`${t('checkout:travelokaPay:validation:cardNumber')} ${t('checkout:travelokaPay:validation:invalid')}`);
            }
            if (!window.Xendit.card.validateExpiry(expiryDatas[0], `20${expiryDatas[1]}`)) {
                travelokaPayRef.current.setFieldError(
                    'expiryDate',
                    `${t('checkout:travelokaPay:validation:expiryDate')} ${t('checkout:travelokaPay:validation:invalid')}`,
                );
                errorMessages.push(`${t('checkout:travelokaPay:validation:expiryDate')} ${t('checkout:travelokaPay:validation:invalid')}`);
            }
            if (!window.Xendit.card.validateCvn(cvv)) {
                travelokaPayRef.current.setFieldError(
                    'cvv',
                    `${t('checkout:travelokaPay:validation:cvv')} ${t('checkout:travelokaPay:validation:invalid')}`,
                );
                errorMessages.push(`${t('checkout:travelokaPay:validation:cvv')} ${t('checkout:travelokaPay:validation:invalid')}`);
            }

            if (errorMessages.length > 0) {
                handleOpenMessage({
                    variant: 'error',
                    text: errorMessages,
                });
                state.loading.order = false;
                setCheckout(state);
                return;
                // eslint-disable-next-line no-else-return
            } else {
                handleOpenMessage({
                    variant: 'success',
                    text: 'Successfully Validated.',
                });
            }
        }

        if (Object.keys(formValidation).length === 0 && formValidation.constructor === Object) {
            if (checkout.selected.delivery === 'pickup' && (checkout.error.pickupInformation || checkout.error.selectStore)) {
                state.loading.order = false;
                setCheckout(state);

                const msg = t('checkout:completePikcupInfo');
                handleOpenMessage({
                    variant: 'error',
                    text: msg,
                });
            } else {
                if (formik.values.orderComment !== '') {
                    result = await placeOrderWithOrderComment({
                        variables: {
                            cartId: cart.id,
                            origin: originName,
                            orderComment: formik.values.orderComment,
                        },
                    });
                } else {
                    await placeOrder({
                        variables: {
                            cartId: cart.id,
                            origin: originName,
                        },
                    })
                        .then((res) => {
                            result = res;
                        })
                        .catch((err) => {
                            result = err;
                        });
                }

                state = { ...checkout };
                state.loading.order = false;
                setCheckout(state);

                if (!validateResponse(result, state)) return;

                let orderNumber = '';
                let infoMsg = '';
                if (storeConfigLocalStorage.enable_oms_multiseller === '1') {
                    if (result.data && result.data.placeOrder[0] && result.data.placeOrder[0].order && result.data.placeOrder[0].order.order_number) {
                        // eslint-disable-next-line array-callback-return
                        result.data.placeOrder.map((order, index) => {
                            if (index !== result.data.placeOrder.length - 1) {
                                orderNumber = `${orderNumber}${order.order.order_number}|`;
                                infoMsg = order.infoMsg;
                            } else {
                                orderNumber = `${orderNumber}${order.order.order_number}`;
                                infoMsg = order.infoMsg;
                            }
                            tempMidtransOrderId.push(order.order.order_number);
                        });
                    }
                } else {
                    if (result.data && result.data.placeOrder[0] && result.data.placeOrder[0].order && result.data.placeOrder[0].order.order_number) {
                        orderNumber = result.data.placeOrder[0].order.order_number;
                        infoMsg = result.data.placeOrder[0].infoMsg;
                        tempMidtransOrderId.push(orderNumber);
                    }
                }
                if (orderNumber && orderNumber !== '') {
                    if (storeConfigLocalStorage.enable_oms_multiseller === '1') {
                        setCheckoutData({
                            email: isGuest ? formik.values.email : cart.email,
                            order_number: orderNumber,
                            order_id: orderNumber,
                            infoMsg,
                        });
                    } else {
                        setCheckoutData({
                            email: isGuest ? formik.values.email : cart.email,
                            order_number: orderNumber,
                            order_id: result.data.placeOrder[0].order.order_id,
                            infoMsg,
                        });
                    }
                    if (client && client.query && typeof client.query === 'function') {
                        await client.query({ query: localTotalCart, data: { totalCart: 0 } });
                    }

                    if (checkout.data.cart.selected_payment_method.code.match(/snap.*/)) {
                        setOrderId(orderNumber);
                        setSnapOrderId(tempMidtransOrderId);
                        await getSnapToken({ variables: { orderId: tempMidtransOrderId } });
                    } else if (
                        checkout.data.cart.selected_payment_method.code.match(/ovo.*/)
                        || checkout.data.cart.selected_payment_method.code.match(/ipay88*/)
                    ) {
                        window.location.href = getIpayUrl(orderNumber);
                    } else if (checkout.data.cart.selected_payment_method.code.match(/indodana/)) {
                        await getIndodanaRedirect({ variables: { order_number: orderNumber } });
                    } else if (
                        modules.checkout.xendit.paymentPrefixCode.includes(checkout.data.cart.selected_payment_method.code)
                        || modules.checkout.xendit.paymentPrefixCodeOnSuccess.includes(checkout.data.cart.selected_payment_method.code)
                    ) {
                        handleXendit(orderNumber);
                    } else if (checkout.data.cart.selected_payment_method.code.match(/travelokapay/)) {
                        handleTravelokaPay(orderNumber);
                    } else {
                        handleOpenMessage({
                            variant: 'success',
                            text: t('checkout:message:placeOrder'),
                        });
                        window.location.replace(generatesuccessRedirect(orderNumber));
                    }

                    setTimeout(() => {
                        removeCartId();
                    }, 1000);
                } else {
                    state.loading.order = false;
                    setCheckout(state);

                    const msg = t('checkout:message:serverError');

                    handleOpenMessage({
                        variant: 'error',
                        text: msg,
                    });
                }
            }
        } else {
            state.loading.order = false;
            setCheckout(state);

            const msg = checkout.data.isGuest ? t('checkout:message:guestFormValidation') : t('checkout:message:customerFormValidation');

            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    };

    // manage indodana redirect
    if (!urlIndodana.loading && urlIndodana.data && urlIndodana.data.indodanaRedirectUrl && urlIndodana.data.indodanaRedirectUrl.redirect_url) {
        window.location.replace(urlIndodana.data.indodanaRedirectUrl.redirect_url);
    }

    useEffect(() => {
        if (!urlIndodana.loading && urlIndodana.error) {
            const msg = t('checkout:message:serverError');

            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    }, [urlIndodana]);

    // Start - Manage Snap Pop Up When Opened (Waiting Response From SnapToken)
    if (
        manageSnapToken.data
        && orderId
        && snapOrderId
        && !snapOpened
        && manageSnapToken.data.getSnapTokenByOrderId
        && manageSnapToken.data.getSnapTokenByOrderId.snap_token
    ) {
        const snapToken = manageSnapToken.data.getSnapTokenByOrderId.snap_token;
        if (snap && snap.pay) {
            snap.pay(snapToken, {
                async onSuccess() {
                    window.location.replace(generatesuccessRedirect(orderId));
                },
                async onPending() {
                    window.location.replace(generatesuccessRedirect(orderId));
                },
                async onError() {
                    window.backdropLoader(true);
                    getSnapOrderStatusByOrderId({
                        variables: {
                            orderId: snapOrderId,
                        },
                    });

                    if (!checkout.data.isGuest) {
                        getCustCartId();
                    }

                    setSnapOpened(true);
                },
                async onClose() {
                    window.backdropLoader(true);
                    getSnapOrderStatusByOrderId({
                        variables: {
                            orderId: snapOrderId,
                        },
                    });

                    if (!checkout.data.isGuest) {
                        getCustCartId();
                    }

                    setSnapOpened(true);
                },
            });
        }
    }

    if (manageSnapToken.error && orderId) {
        window.location.replace(generateCartRedirect(orderId));
    }
    // End - Manage Snap Pop Up When Opened (Waitinge Response From SnapToken)

    // Start - Process Snap Pop Up Close (Waitinge Response From Reorder)
    if (snapStatus.data && !snapClosed) {
        const { cart_id, order_id } = snapStatus.data.getSnapOrderStatusByOrderId;
        setSnapClosed(true);

        if (!checkout.data.isGuest && manageCustCartId.data) {
            const { id: customerCartId } = manageCustCartId.data.customerCart;
            setCartId(customerCartId);
            setOrderId(null);
            setSnapOrderId([]);
            window.location.replace(generateCartRedirect(order_id));
        } else {
            setCartId(cart_id);
            setOrderId(null);
            setSnapOrderId([]);
            window.location.replace(generateCartRedirect(order_id));
        }
    }
    // End - Process Snap Pop Up Close (Waitinge Response From Reorder)

    const setCart = (cart = {}) => {
        const state = { ...checkout };
        state.data.cart = { ...state.data.cart, ...cart };
        setCheckout(state);
    };

    const setLoadSummary = (load) => {
        const state = { ...checkout };
        window.backdropLoader(load);
        state.loading.addresses = load;
        state.loading.order = load;
        state.loading.shipping = load;
        state.loading.payment = load;
        state.loading.extraFee = load;
        setCheckout(state);
    };

    useEffect(() => {
        if (!updatedCart.loading && updatedCart.data) {
            setLoadSummary(false);
            window.toastMessage({
                open: true,
                text: t('common:cart:updateSuccess'),
                variant: 'success',
            });
            setCart({ ...updatedCart.data.cart });
        }
    }, [updatedCart.loading]);

    useEffect(() => {
        if (typeof refSummary !== 'undefined') {
            // eslint-disable-next-line no-param-reassign
            refSummary.current = {
                handlePlaceOrder,
            };
        }
    }, [refSummary]);
    const Loader = () => (
        <>
            <Skeleton variant="rect" width="100%" height={300} animation="wave" style={{ marginBottom: 5 }} />
            <Skeleton variant="rect" width="100%" height={50} animation="wave" style={{ marginBottom: 5 }} />
        </>
    );
    if (checkout.loading.all) {
        return <Loader />;
    }

    // update items
    const updateCart = (id, qty) => {
        setLoadSummary(true);
        actUpdateItem({
            variables: {
                cartId: checkout.data.cart.id,
                cart_item_id: parseInt(id, 10),
                quantity: qty,
            },
            context: {
                request: 'internal',
            },
        })
            .then((res) => {
                if (res && res.data && res.data.updateCartItems && res.data.updateCartItems.cart) {
                    getUpdatedCart({ variables: { cartId: checkout.data.cart.id } });
                }
            })
            .catch((e) => {
                setLoadSummary(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('common:cart:updateFailed'),
                    variant: 'error',
                });
            });
    };

    const deleteCart = (id) => {
        setLoadSummary(true);
        actDeleteItem({
            variables: {
                cartId: checkout.data.cart.id,
                cart_item_id: parseInt(id, 10),
            },
            context: {
                request: 'internal',
            },
        })
            .then((res) => {
                if (res && res.data && res.data.removeItemFromCart && res.data.removeItemFromCart.cart) {
                    setLoadSummary(false);
                    window.toastMessage({
                        open: true,
                        text: t('common:cart:deleteSuccess'),
                        variant: 'success',
                    });
                    if (res.data.removeItemFromCart.cart.items === null || res.data.removeItemFromCart.cart.items.length === 0) {
                        window.location.replace(generateCartRedirect());
                    } else {
                        setCart({ ...res.data.removeItemFromCart.cart });
                    }
                }
            })
            .catch((e) => {
                setLoadSummary(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('common:cart:deleteFailed'),
                    variant: 'error',
                });
            });
    };

    // check error items
    if (checkout.data.cart.errorItems && checkout.data.cart.errorItems?.length > 0) {
        const errorMessage = {
            variant: 'warning',
            text: checkout.data.cart.errorItems[0],
            open: true,
        };
        window.toastMessage({
            ...errorMessage,
        });
        setTimeout(() => {
            Router.push('/checkout/cart');
        }, 3000);
    }

    if (checkout && checkout.data && checkout.data.cart && checkout.loading) {
        return (
            <>
                <ModalXendit open={openXendit} setOpen={() => setOpenXendit(!openXendit)} iframeUrl={xenditIframeUrl} {...xenditState} />
                <Traveloka3DSModal open={openTraveloka} setOpen={setOpenTraveloka} handleClose={handleClose} />
                <div className="hidden-desktop">
                    <SummaryPlugin
                        t={t}
                        loadTotal={totalPrice}
                        loading={loading}
                        isLoader={checkout.loading.order}
                        disabled={errorItems || disabled || (isSelectedPurchaseOrder && !isPurchaseOrderApply) || checkout.error.shippingAddress}
                        handleActionSummary={handlePlaceOrder}
                        dataCart={checkout.data.cart}
                        isDesktop={false}
                        showItems
                        label={t('checkout:placeOrder')}
                        globalCurrency={globalCurrency}
                        updateCart={updateCart}
                        deleteCart={deleteCart}
                        withAction
                        storeConfig={storeConfig}
                    />
                </div>
                <SummaryPlugin
                    t={t}
                    loading={loading}
                    loadTotal={totalPrice}
                    isLoader={checkout.loading.order}
                    handleActionSummary={handlePlaceOrder}
                    dataCart={checkout.data.cart}
                    disabled={errorItems || disabled || (isSelectedPurchaseOrder && !isPurchaseOrderApply) || checkout.error.shippingAddress}
                    isDesktop
                    showItems
                    hideButton
                    globalCurrency={globalCurrency}
                    updateCart={updateCart}
                    deleteCart={deleteCart}
                    withAction
                    storeConfig={storeConfig}
                />
            </>
        );
    }

    return null;
};

export default Summary;
