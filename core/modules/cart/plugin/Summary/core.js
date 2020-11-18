import { formatPrice } from '@helper_currency';
import config from '@config';

const CoreSummary = (props) => {
    const {
        DesktopView, MobileView, isDesktop, dataCart, globalCurrency = 'IDR',
        ...other
    } = props;
    const { modules } = config;
    let dataSummary = [];
    let total = 0;
    const {
        prices = {},
        items = [],
        applied_store_credit = {},
        applied_reward_points = {},
        shipping_addresses = [],
        applied_extra_fee = {},
    } = dataCart;

    let {
        applied_giftcard = {},
    } = dataCart;

    if (modules.giftcard.useCommerceModule) {
        applied_giftcard = dataCart.applied_gift_cards;
    }

    if (dataCart && items) {
        const sumTotalItem = items.reduce(
            (prev, curr) => ({
                value: prev.value + curr.prices.row_total.value,
                currency: curr.prices.row_total.currency,
            }),
            { value: 0 },
        );
        const subtotal = formatPrice(sumTotalItem.value, sumTotalItem.currency || globalCurrency);
        total = prices.grand_total;
        const [shipping] = shipping_addresses;

        dataSummary.push({ item: 'Sub total', value: subtotal });

        if (modules.checkout.extraFee.enabled && applied_extra_fee && applied_extra_fee.extrafee_value) {
            dataSummary.push({
                item: applied_extra_fee.title || '',
                value: formatPrice(applied_extra_fee.extrafee_value.value || 0, globalCurrency),
            });
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            const price = formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency);
            dataSummary.push({ item: 'shipping', value: price });
        }
        if (prices && prices.discounts && prices.discounts.length) {
            const discounts = prices.discounts.map((disc) => {
                const price = formatPrice(disc.amount.value, disc.amount.currency);
                return { item: `${disc.label} - ${price}`, value: `-${price}` };
            });
            dataSummary = dataSummary.concat(discounts);
        }

        if (modules.storecredit.enabled) {
            let price = '';
            if (modules.storecredit.useCommerceModule && applied_store_credit.applied_balance && applied_store_credit.applied_balance.value > 0) {
                price = formatPrice(Math.abs(applied_store_credit.applied_balance.value), globalCurrency);
            } else if (applied_store_credit.is_use_store_credit) {
                price = formatPrice(Math.abs(applied_store_credit.store_credit_amount), globalCurrency);
            }
            if (price !== '') dataSummary.push({ item: 'Store Credit', value: `-${price}` });
        }

        if (modules.rewardpoint.enabled && applied_reward_points.is_use_reward_points) {
            const price = formatPrice(Math.abs(applied_reward_points.reward_points_amount), globalCurrency);
            dataSummary.push({ item: 'Reward Point ', value: `-${price}` });
        }

        if (modules.giftcard.enabled && applied_giftcard) {
            let giftCards = [];
            if (modules.giftcard.useCommerceModule) {
                if (applied_giftcard && applied_giftcard.length > 0) {
                    giftCards = applied_giftcard.map((item) => {
                        const price = formatPrice(Math.abs(item.applied_balance.value), globalCurrency);
                        return { item: `Gift Card (${item.code}) - ${price}`, value: `-${price}` };
                    });
                }
            } else {
                giftCards = applied_giftcard.giftcard_detail.map((item) => {
                    const price = formatPrice(Math.abs(item.giftcard_amount_used), globalCurrency);
                    return { item: `Gift Card (${item.giftcard_code}) - ${price}`, value: `-${price}` };
                });
            }
            dataSummary = dataSummary.concat(giftCards);
        }
    }

    if (isDesktop) {
        return (
            <DesktopView items={items} summary={{ total, data: dataSummary }} isDesktop={isDesktop} {...other} />
        );
    }

    return (
        <MobileView items={items} summary={{ total, data: dataSummary }} {...other} />
    );
};

export default CoreSummary;
