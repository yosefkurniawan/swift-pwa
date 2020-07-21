import Button from '@common_button';
import Typography from '@common_typography';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { customerFeautres } from '@config';
import { formatPrice } from '@helpers/currency';
import classNames from 'classnames';
import gqlService from '../../services/graphql';
import FieldPoint from './fieldPoint';
import RewardPoint from './component/rewardPoint';

const DiscountSection = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        handleOpenMessage,
        formik,
        storeConfig,
        styles,
    } = props;
    const [applyCouponTocart] = gqlService.applyCouponToCart({ onError: () => {} });
    const [removeCouponFromCart] = gqlService.removeCouponFromCart({ onError: () => {} });
    const [applyStoreCreditToCart] = gqlService.applyStoreCreditToCart({ onError: () => {} });
    const [applyGiftCardToCart] = gqlService.applyGiftCardToCart({ onError: () => {} });
    const [removeGiftCardFromCart] = gqlService.removeGiftCardFromCart({ onError: () => {} });
    const [removeStoreCreditFromCart] = gqlService.removeStoreCreditFromCart({ onError: () => {} });

    let store_credit = null;
    let credit = '0';
    let total = 0;
    let giftCards = [];
    let appliedGiftCards = [];

    if (checkout.data.customer && checkout.data.cart) {
        store_credit = {
            ...checkout.data.customer.store_credit,
            ...checkout.data.cart.applied_store_credit,
        };

        credit = store_credit.current_balance.value || 0;
        credit = store_credit.is_use_store_credit ? `${store_credit.store_credit_amount}` : credit;
        appliedGiftCards = checkout.data.cart.applied_giftcard.giftcard_detail.map((item) => item.giftcard_code);
        giftCards = checkout.data.customer.gift_card.filter((item) => !appliedGiftCards.includes(item.giftcard_code));
        total = checkout.data.cart.prices.grand_total.value;
    }

    const handleApplyGift = async (code = null) => {
        let state = { ...checkout };
        state.loading.giftCard = true;
        setCheckout(state);

        const cartId = state.data.cart.id;
        const finalCode = code || formik.values.giftCard;

        const result = await applyGiftCardToCart({
            variables: {
                cartId,
                code: finalCode,
            },
        });

        state = { ...checkout };
        if (result && result.data) {
            const updatedCart = result.data.applyGiftCardToCart.cart;
            state.data.cart = updatedCart;
            formik.setFieldValue('giftCard', '');
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:giftCardApplied'),
            });
        } else {
            formik.setFieldError('giftCard', t('checkout:message:giftCardError'));
        }

        state.loading.giftCard = false;
        setCheckout(state);
    };

    const handleRemoveGift = async (code) => {
        let state = { ...checkout };
        state.loading.giftCard = true;
        setCheckout(state);

        const cartId = state.data.cart.id;
        const result = await removeGiftCardFromCart({
            variables: {
                cartId,
                code,
            },
        });

        state = { ...checkout };
        if (result && result.data) {
            const updatedCart = result.data.removeGiftCardFromCart.cart;
            state.data.cart = updatedCart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:giftCardRemoved'),
            });
        }

        state.loading.giftCard = false;
        setCheckout(state);
    };

    const handleUseCredit = async () => {
        let cart;
        const state = { ...checkout };
        const cartId = state.data.cart.id;
        state.loading.storeCredit = true;
        setCheckout(state);

        if (store_credit.is_use_store_credit) {
            const result = await removeStoreCreditFromCart({ variables: { cartId } });
            cart = result && result.data.removeStoreCreditFromCart.cart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:storeCreditRemoved'),
            });
        } else {
            const result = await applyStoreCreditToCart({ variables: { cartId } });
            cart = result && result.data.applyStoreCreditToCart.cart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:storeCreditApplied'),
            });
        }

        if (cart) {
            state.data.cart = cart;
        } else {
            await formik.setFieldError('coupon', t('checkout:message:serverError'));
        }

        state.loading.storeCredit = false;
        setCheckout(state);
    };

    const handlePromo = async () => {
        let cart;
        const state = { ...checkout };
        state.loading.coupon = true;
        setCheckout(state);
        const isApplied = !state.data.isCouponAppliedToCart;

        if (isApplied) {
            const result = await applyCouponTocart({ variables: { cartId: checkout.data.cart.id, coupon: formik.values.coupon } });
            cart = result && result.data.applyCouponToCart.cart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:couponApplied'),
            });
        } else {
            const result = await removeCouponFromCart({ variables: { cartId: checkout.data.cart.id } });
            cart = result && result.data.removeCouponFromCart.cart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:couponRemoved'),
            });
        }

        state.loading.coupon = false;

        if (cart) {
            state.data.cart = cart;
            state.data.isCouponAppliedToCart = !state.data.isCouponAppliedToCart;
        } else {
            await formik.setFieldError('coupon', t('checkout:message:couponError'));
        }

        setCheckout(state);
    };
    return (
        <div className={classNames(styles.block, styles.rmBorder)}>
            <FieldPoint
                id="coupon"
                placeholder="Promo Code"
                action={handlePromo}
                onChange={formik.handleChange}
                value={formik.values.coupon}
                disabled={checkout.loading.coupon}
                toggleField={checkout.data.isCouponAppliedToCart}
                loading={checkout.loading.coupon}
                error={!!formik.errors.coupon}
                errorMessage={formik.errors.coupon}
                styles={styles}
            />
            {customerFeautres.giftCard ? (
                <div className={styles.giftCardContainer}>
                    <FieldPoint
                        id="giftCard"
                        placeholder="Gift Card Code"
                        action={() => {
                            handleApplyGift();
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.giftCard}
                        disabled={checkout.loading.giftCard}
                        error={!!formik.errors.giftCard}
                        errorMessage={formik.errors.giftCard}
                        styles={styles}
                    />
                    {appliedGiftCards.length || giftCards.length ? (
                        <div className={styles.giftCardInfoContainer}>
                            {giftCards.length === 0 ? null : (
                                <div>
                                    <Typography variant="p" letter="capitalize">
                                        Your Gift Card
                                    </Typography>
                                    <div className={styles.giftCardItemContainer}>
                                        {giftCards.map((item, index) => (
                                            <Chip
                                                disabled={checkout.loading.giftCard}
                                                className={styles.giftCard}
                                                key={index}
                                                size="small"
                                                label={item.giftcard_code}
                                                onClick={() => {
                                                    handleApplyGift(item.giftcard_code);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {appliedGiftCards.length === 0 ? null : (
                                <div>
                                    <Typography variant="p" letter="capitalize">
                                        Applied Gift Card
                                    </Typography>
                                    <div className={styles.giftCardItemContainer}>
                                        {appliedGiftCards.map((item, index) => (
                                            <Chip
                                                disabled={checkout.loading.giftCard}
                                                className={styles.giftCard}
                                                color="primary"
                                                key={index}
                                                size="small"
                                                label={item}
                                                onDelete={() => {
                                                    handleRemoveGift(item);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}
                    {checkout.loading.giftCard && <CircularProgress className={styles.largeCircular} size={30} />}
                </div>
            ) : null}
            {customerFeautres.rewardPoint && checkout.data.cart && checkout.data.customer ? (
                <RewardPoint {...props} />
            ) : null}
            {store_credit && (store_credit.enabled || customerFeautres.storeCredit) ? (
                <div className={styles.cardPoint}>
                    <div className="column">
                        <Typography variant="span" letter="capitalize">
                            {store_credit.is_use_store_credit ? t('checkout:myCredit:used') : t('checkout:myCredit:title')}
                        </Typography>
                        <Typography variant="title" type="bold" className={styles.pointText}>
                            {formatPrice(
                                `${credit}`.toLocaleString(undefined, { minimumFractionDigits: 0 }),
                                storeConfig.default_display_currency_code,
                            )}
                        </Typography>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            className={styles.btnPoint}
                            disabled={!!(checkout.loading.storeCredit || (!!(total === 0 && !store_credit.is_use_store_credit)))}
                            onClick={handleUseCredit}
                        >
                            <Typography
                                color={checkout.loading.storeCredit || (total === 0 && !store_credit.is_use_store_credit) ? 'gray' : 'default'}
                                variant="p"
                                type="bold"
                                letter="uppercase"
                                align="center"
                            >
                                {store_credit.is_use_store_credit ? t('checkout:myCredit:removeButton') : t('checkout:myCredit:button')}
                            </Typography>
                            {checkout.loading.storeCredit && <CircularProgress className={styles.smallCircular} size={16} />}
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default DiscountSection;
