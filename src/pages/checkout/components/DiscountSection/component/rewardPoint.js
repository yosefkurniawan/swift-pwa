/* eslint-disable no-unused-vars */
import Button from '@Button';
import Typography from '@components/Typography';
import { formatPrice } from '@helpers/currency';
import CircularProgress from '@material-ui/core/CircularProgress';
import gqlService from '../../../services/graphql';

const RewardPoint = ({
    t,
    checkout,
    setCheckout,
    handleOpenMessage,
    formik,
    storeConfig,
    styles,
}) => {
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
            cart = result && result.data.removeRewardPointsFromCart.cart;
            if (result) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:rewardPointsRemoved'),
                });
            }
        } else {
            const result = await applyRewardPointsToCart({ variables: { cartId: id } });
            cart = result && result.data.applyRewardPointsToCart.cart;
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
    return (
        <div className={styles.cardPoint}>
            <div className="column">
                <Typography variant="span" letter="capitalize">
                    {checkout.data.cart.applied_reward_points.is_use_reward_points
                        ? `${t('checkout:myPoint:used')} 
                        ${checkout.data.cart.applied_reward_points.is_use_reward_points} 
                        ${t('checkout:myPoint:rewardPoints')}` : t('checkout:myPoint:title') }
                </Typography>
                <Typography variant="title" type="bold" className={styles.pointText}>
                    {checkout.data.cart.applied_reward_points.is_use_reward_points
                        ? formatPrice(checkout.data.cart.applied_reward_points.reward_points_amount, 'USD')
                        : `${checkout.data.rewardPoints.balance
                            ? checkout.data.rewardPoints.balance.toLocaleString(undefined, { minimumFractionDigits: 0 }) : 0}
                         (${checkout.data.rewardPoints.formatedBalanceCurrency})`}
                </Typography>
            </div>
            <div>
                <Button
                    variant="outlined"
                    className={styles.btnPoint}
                    onClick={handleUsePoint}
                    disabled={loading || (!reward_point.is_use_reward_points && total === 0)}
                >
                    <Typography
                        variant="p"
                        type="bold"
                        letter="uppercase"
                        color={loading || (!reward_point.is_use_reward_points && total === 0) ? 'gray' : 'default'}
                    >
                        {reward_point.is_use_reward_points ? t('checkout:myPoint:removeButton') : t('checkout:myPoint:button') }
                    </Typography>
                    {loading && <CircularProgress className={styles.smallCircular} size={16} />}
                </Button>
            </div>
        </div>
    );
};

export default RewardPoint;
