import { gql, useMutation } from '@apollo/client';
import gqlService from '@core_modules/checkout/services/graphql';

import React from 'react';
import TagManager from 'react-gtm-module';

import config from '@config';

const { modules } = config;

const Shipping = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        updateFormik,
        handleOpenMessage,
        storeConfig,
        isOnlyVirtualProductOnCart,
        ShippingView,
        checkoutTokenState,
        setCheckoutTokenState,
        loadingSellerInfo,
    } = props;

    const { loading, data, selected } = checkout;
    const [setShippingMethod] = gqlService.setShippingMethod();
    // const [setShippingMethodMultiseller] = gqlService.setShippingMethodMultiseller();
    const { data: shippingMethodList } = gqlService.getCheckoutConfigurations();

    const handleShipping = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            if (storeConfig.enable_oms_multiseller === '1') {
                const [carrier_code, method_code, seller_id] = val.split('_');
                // let completeShipping = true;
                let state = {
                    ...checkout,
                    loading: {
                        ...checkout.loading,
                        all: false,
                        shipping: false,
                        extraFee: true,
                        order: true,
                    },
                };
                console.log(val);
                console.log(state);
                // state.selected.shipping[seller_id] = val;
                const setBySellerId = state.selected.shipping.find((item) => item.seller_id === seller_id);
                if (setBySellerId) {
                    state.selected.shipping.find((item) => item.seller_id === seller_id).name.carrier_code = carrier_code;
                    state.selected.shipping.find((item) => item.seller_id === seller_id).name.method_code = method_code;
                }
                console.log(state);

                // eslint-disable-next-line array-callback-return
                // state.selected.shipping.map((ship) => {
                //     if (ship.name.carrier_code === null || ship.name.method_code === null) {
                //         completeShipping = false;
                //     }
                // });
                // setCheckout(state);

                // if (completeShipping) {

                // }

                const promoBanner = `
                    promoBanner {
                    cms_block_id
                    name
                    cms_block_identifier
                    rule_id
                    }
                `;

                const selected_shipping_method = `
                    selected_shipping_method {
                        method_code
                        carrier_code
                        amount {
                            value
                            currency
                        }
                    }
                `;

                const applied_cashback = `
                applied_cashback {
                    data {
                        amount
                        promo_name
                    }
                    is_cashback
                    total_cashback
                }
                `;

                const applied_reward_points = `
                applied_reward_points {
                    is_use_reward_points
                    reward_points_amount
                }
                `;

                const applied_coupons = `
                applied_coupons {
                    code
                }
                `;

                const applied_extrafee = `
                applied_extra_fee {
                    extrafee_value {
                    currency
                    value
                    }
                    select_options {
                    default
                    label
                    option_id
                    price
                    }
                    show_on_cart
                    title
                }
                addtional_fees {
                    data {
                    enabled
                    fee_name
                    frontend_type
                    id_fee
                    options {
                        default
                        label
                        option_id
                        price
                    }
                    }
                    show_on_cart
                }
                `;

                const applied_giftcard = modules.giftcard.useCommerceModule
                    ? `
                applied_gift_cards {
                    applied_balance {
                    currency
                    value
                    }
                    code
                    current_balance {
                    currency
                    value
                    }
                }
                `
                    : `
                applied_giftcard {
                    giftcard_amount
                    giftcard_detail {
                        giftcard_amount_used
                        giftcard_code
                    }
                }

                `;

                const applied_store_credit = modules.storecredit.useCommerceModule
                    ? `
                applied_store_credit {
                    applied_balance {
                    currency
                    value
                    }
                    current_balance {
                    currency
                    value
                    }
                    enabled
                }
                `
                    : `
                applied_store_credit {
                    store_credit_amount
                    is_use_store_credit
                }
                `;

                const prices = `
                prices {
                    discounts {
                        amount {
                            currency
                            value
                        }
                        label
                    }
                    subtotal_excluding_tax {
                        currency
                        value
                    }
                    subtotal_including_tax {
                        currency
                        value
                    }
                    applied_taxes {
                        amount {
                            value
                            currency
                        }
                    }
                    grand_total {
                        currency
                        value
                    }
                }
                `;

                let queryShippingMethod = '';

                const checkEmpty = state.selected.shipping.find((item) => item.name.carrier_code === null);

                if (!checkEmpty) {
                    state.selected.shipping.forEach((selectedShipping) => {
                        queryShippingMethod += `
                            {
                                carrier_code: "${selectedShipping.name.carrier_code}",
                                method_code: "${selectedShipping.name.method_code}"
                                seller_id: "${selectedShipping.seller_id}"
                            }
                        `;
                    });
                }

                const setShippingMethodMultiseller = gql`
                    mutation setShippingMethod(
                        $cartId: String!,
                    ) {
                        setShippingMethodsOnCart(
                            input: {
                                cart_id: $cartId,
                                shipping_methods: [${queryShippingMethod}]
                        }) {
                            cart {
                                id
                                ${promoBanner}
                                shipping_addresses {
                                    ${selected_shipping_method}
                                }
                                ${modules.checkout.cashback.enabled ? applied_cashback : ''}
                                ${modules.checkout.extraFee.enabled ? applied_extrafee : ''}
                                ${prices}
                                ${modules.promo.enabled ? applied_coupons : ''}
                                ${modules.rewardpoint.enabled ? applied_reward_points : ''}
                                ${modules.giftcard.enabled ? applied_giftcard : ''}
                                ${modules.storecredit.enabled ? applied_store_credit : ''}
                            }
                        }
                    }
                `;

                const setShippingMethodMultisellerMutation = (options = {}) => useMutation(setShippingMethodMultiseller, {
                    ...options,
                    ...config(false),
                });

                let updatedCart = {};
                await setShippingMethodMultisellerMutation({
                    variables: {
                        cartId: cart.id,
                    },
                }).then((res) => {
                    updatedCart = res;
                }).catch((err) => {
                    updatedCart = err;
                });

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

                if (updatedCart && updatedCart.data && updatedCart.data.setShippingMethodsOnCart && updatedCart.data.setShippingMethodsOnCart.cart) {
                    console.log('updated cart top', updatedCart);
                    updatedCart = {
                        ...checkout.data.cart,
                        ...updatedCart.data.setShippingMethodsOnCart.cart,
                    };
                    console.log(checkout.data.cart);
                    console.log('updated cart bot', updatedCart);
                    updateFormik(updatedCart);

                    const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
                        ...method,
                        label: method.title,
                        value: method.code,
                        image: null,
                    }));

                    state = { ...checkout };
                    state.data.paymentMethod = paymentMethod;
                    state.data.cart = updatedCart;
                    setCheckout(state);
                } else {
                    state.selected.shipping = null;
                    if (updatedCart.message.includes('Token is wrong.')) {
                        setCheckoutTokenState(!checkoutTokenState);
                    } else {
                        handleOpenMessage({
                            variant: 'error',
                            text: t('checkout:message:problemConnection'),
                        });
                    }
                }
            } else {
                const [carrier_code, method_code] = val.split('_');
                let state = {
                    ...checkout,
                    loading: {
                        ...checkout.loading,
                        all: false,
                        shipping: false,
                        extraFee: true,
                        order: true,
                    },
                };
                state.selected.shipping = val;
                setCheckout(state);

                let updatedCart = {};
                await setShippingMethod({
                    variables: {
                        cartId: cart.id,
                        carrierCode: carrier_code,
                        methodCode: method_code,
                    },
                }).then((res) => {
                    updatedCart = res;
                }).catch((err) => {
                    updatedCart = err;
                });

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

                if (updatedCart && updatedCart.data && updatedCart.data.setShippingMethodsOnCart && updatedCart.data.setShippingMethodsOnCart.cart) {
                    updatedCart = {
                        ...checkout.data.cart,
                        ...updatedCart.data.setShippingMethodsOnCart.cart,
                    };
                    updateFormik(updatedCart);

                    const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
                        ...method,
                        label: method.title,
                        value: method.code,
                        image: null,
                    }));

                    state = { ...checkout };
                    state.data.paymentMethod = paymentMethod;
                    state.data.cart = updatedCart;
                    setCheckout(state);
                    const selectedShipping = data.shippingMethods.filter((item) => item.method_code === method_code);
                    const dataLayer = {
                        event: 'checkout',
                        ecommerce: {
                            checkout: {
                                actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout' },
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
                                actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout_option' },
                            },
                        },
                    };
                    TagManager.dataLayer({
                        dataLayer,
                    });
                    TagManager.dataLayer({
                        dataLayer: dataLayerOption,
                    });
                } else {
                    state.selected.shipping = null;
                    if (updatedCart.message.includes('Token is wrong.')) {
                        setCheckoutTokenState(!checkoutTokenState);
                    } else {
                        handleOpenMessage({
                            variant: 'error',
                            text: t('checkout:message:problemConnection'),
                        });
                    }
                }
            }
        }
    };

    return (
        <ShippingView
            checkout={checkout}
            storeConfig={storeConfig}
            t={t}
            shippingMethodList={shippingMethodList}
            handleShipping={handleShipping}
            loading={loading}
            selected={selected}
            data={data}
            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
            loadingSellerInfo={loadingSellerInfo}
        />
    );
};

export default Shipping;
