import { modules } from '@config';

import gqlService from '@core_modules/checkout/services/graphql';

const DiscountSection = (props) => {
    const {
        t, checkout, setCheckout, handleOpenMessage, storeConfig, StoreCreditView,
    } = props;
    let items = [];
    if (checkout.data.cart && checkout.data.cart.items) items = checkout.data.cart.items;

    let cartItemBySeller = [];

    if (items.length > 0) {
        const unGroupedData = items;

        // eslint-disable-next-line no-shadow, object-curly-newline
        const groupData = unGroupedData.reduce((groupData, { id, quantity, pickup_item_store_info, prices: pricesItem, product, ...others }) => {
            let item = groupData.find((p) => p.seller_id === product.seller.seller_id);
            if (!item) {
                item = {
                    seller_id: product.seller.seller_id,
                    seller_name: product.seller.seller_name ? product.seller.seller_name : 'Default Seller',
                    productList: [],
                    subtotal: {
                        currency: '',
                        value: 0,
                    },
                };
                groupData.push(item);
            }
            let child = item.productList.find((ch) => ch.name === product.name);
            if (!child) {
                child = {
                    id,
                    prices: pricesItem,
                    product,
                    quantity,
                    ...others,
                };
                item.productList.push(child);
                item.subtotal.currency = pricesItem.row_total_including_tax.currency;
                item.subtotal.value += pricesItem.row_total_including_tax.value;
            }
            return groupData;
        }, []);
        cartItemBySeller = groupData;
    }

    const [applyStoreCreditToCart] = gqlService.applyStoreCreditToCart({
        onError: (e) => {
            const message = e.message.split(':');
            handleOpenMessage({
                variant: 'error',
                text: message[1] ? message[1] : e.message,
            });
        },
    });
    const [removeStoreCreditFromCart] = gqlService.removeStoreCreditFromCart({
        onError: (e) => {
            const message = e.message.split(':');
            handleOpenMessage({
                variant: 'error',
                text: message[1] ? message[1] : e.message,
            });
        },
    });

    let store_credit = null;
    let credit = '0';
    let total = 0;

    if (checkout.data.customer && checkout.data.cart) {
        store_credit = {
            ...checkout.data.customer.store_credit,
            ...checkout.data.cart.applied_store_credit,
        };

        if (modules.storecredit.useCommerceModule) {
            store_credit.is_use_store_credit = checkout.data.cart.applied_store_credit.applied_balance.value > 0;
        }

        credit = store_credit.current_balance.value || 0;
        if (storeConfig.enable_oms_multiseller === '1') {
            credit = store_credit.is_use_store_credit
                ? `${
                    modules.storecredit.useCommerceModule
                        ? store_credit.applied_balance.value * cartItemBySeller.length
                        : store_credit.store_credit_amount * cartItemBySeller.length
                }`
                : credit;
        } else {
            credit = store_credit.is_use_store_credit
                ? `${modules.storecredit.useCommerceModule ? store_credit.applied_balance.value : store_credit.store_credit_amount}`
                : credit;
        }
        total = checkout.data.cart.prices.grand_total.value;
    }

    const handleUseCredit = async () => {
        let cart;
        const state = { ...checkout };
        const cartId = state.data.cart.id;
        state.loading.storeCredit = true;

        if (store_credit.is_use_store_credit) {
            const result = await removeStoreCreditFromCart({ variables: { cartId } });
            if (result && result.data && result.data.removeStoreCreditFromCart && result.data.removeStoreCreditFromCart.cart) {
                cart = {
                    ...state.data.cart,
                    ...result.data.removeStoreCreditFromCart.cart,
                };
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:storeCreditRemoved'),
                });
            }
        } else {
            const result = await applyStoreCreditToCart({ variables: { cartId } });
            if (result && result.data && result.data.applyStoreCreditToCart && result.data.applyStoreCreditToCart.cart) {
                cart = {
                    ...state.data.cart,
                    ...result.data.applyStoreCreditToCart.cart,
                };
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:storeCreditApplied'),
                });
            }
        }

        if (cart) {
            state.data.cart = cart;
        }

        state.loading.storeCredit = false;
        setCheckout(state);
    };

    if (store_credit && (store_credit.enabled || modules.storecredit.enabled)) {
        return (
            <StoreCreditView
                store_credit={store_credit}
                credit={credit}
                storeConfig={storeConfig}
                checkout={checkout}
                cartItemBySeller={cartItemBySeller}
                handleUseCredit={handleUseCredit}
                total={total}
                t={t}
            />
        );
    }

    return null;
};

export default DiscountSection;
