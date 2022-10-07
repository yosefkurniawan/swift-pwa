/* eslint-disable no-unused-vars */
import { modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';

const RewardPoint = ({
    t, checkout, setCheckout, handleOpenMessage, formik, RewardPointView, storeConfig,
}) => {
    const { items = [] } = checkout.data.cart;

    let cartItemBySeller = {};

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
    const [loading, setLoading] = React.useState(false);
    const [removeRewardPointsFromCart, applRewardPoint] = gqlService.removeRewardPointsFromCart({
        onError: (e) => {
            const message = e.message.split(':');
            handleOpenMessage({
                variant: 'error',
                text: message[1] ? message[1] : e.message,
            });
        },
    });
    const [applyRewardPointsToCart, removeRewardPoint] = gqlService.applyRewardPointsToCart({
        onError: (e) => {
            const message = e.message.split(':');
            handleOpenMessage({
                variant: 'error',
                text: message[1] ? message[1] : e.message,
            });
        },
    });

    let reward_point = {};
    let total = 0;
    if (checkout.data.customer && checkout.data.cart) {
        reward_point = checkout.data.cart.applied_reward_points;
        total = checkout.data.cart.prices.grand_total.value;
    }

    const handleUsePoint = async () => {
        let cart;
        const state = { ...checkout };
        const { id } = checkout.data.cart;
        setLoading(true);
        if (reward_point.is_use_reward_points) {
            const result = await removeRewardPointsFromCart({ variables: { cartId: checkout.data.cart.id, coupon: formik.values.coupon } });
            cart = result && {
                ...state.data.cart,
                ...result.data.removeRewardPointsFromCart.cart,
            };
            if (result) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:rewardPointsRemoved'),
                });
            }
        } else {
            const result = await applyRewardPointsToCart({ variables: { cartId: id } });
            cart = result && {
                ...state.data.cart,
                ...result.data.applyRewardPointsToCart.cart,
            };
            if (result) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:rewardPointsApplied'),
                });
            }
        }
        if (cart) {
            state.data.cart = cart;
        }
        setCheckout(state);
        setLoading(false);
    };
    if (modules.rewardpoint.enabled && checkout.data.cart && checkout.data.customer) {
        return (
            <RewardPointView
                checkout={checkout}
                t={t}
                handleUsePoint={handleUsePoint}
                loading={loading}
                reward_point={reward_point}
                total={total}
                cartItemBySeller={cartItemBySeller}
                storeConfig={storeConfig}
            />
        );
    }

    return null;
};

export default RewardPoint;
