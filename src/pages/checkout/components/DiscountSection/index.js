import Button from '@components/Button';
import Typography from '@components/Typography';
import { CircularProgress, Chip } from '@material-ui/core';
import { Face } from '@material-ui/icons';
import { customerFeautres } from '@config';
import classNames from 'classnames';
import gqlService from '../../services/graphql';
import FieldPoint from './fieldPoint';

const DiscountSection = ({
    t,
    checkout,
    setCheckout,
    handleOpenMessage,
    formik,
    styles,
}) => {
    const [applyCouponTocart] = gqlService.applyCouponToCart({ onError: () => {} });
    const [removeCouponFromCart] = gqlService.removeCouponFromCart({ onError: () => {} });
    const [applyStoreCreditToCart] = gqlService.applyStoreCreditToCart({ onError: () => {} });
    const [applyGiftCardToCart] = gqlService.applyGiftCardToCart({ onError: () => {} });
    const [removeGiftCardFromCart] = gqlService.removeGiftCardFromCart({ onError: () => {} });
    const [removeStoreCreditFromCart] = gqlService.removeStoreCreditFromCart({ onError: () => {} });

    let store_credit = null;
    let credit = 0;
    let giftCards = [];

    if (checkout.data.customer && checkout.data.cart) {
        store_credit = {
            ...checkout.data.customer.store_credit,
            ...checkout.data.cart.applied_store_credit,
        };

        credit = store_credit.current_balance.value || 0;
        credit = store_credit.is_use_store_credit ? store_credit.store_credit_amount : credit;
        const appliedGiftCards = checkout.data.cart.applied_giftcard.giftcard_detail.map((item) => item.giftcard_code);
        giftCards = checkout.data.customer.gift_card.filter((item) => !appliedGiftCards.includes(item.giftcard_code));
    }

    const handleCheckBalance = () => {};
    const handleUsePoint = async () => {};

    const handleApplyGift = async (code = null) => {
        let state = { ...checkout };
        const cartId = state.data.cart.id;
        const finalCode = code || formik.values.giftCard;

        const result = await applyGiftCardToCart({
            variables: {
                cartId,
                code: finalCode,
            },
        });

        if (result && result.data) {
            const updatedCart = result.data.applyGiftCardToCart.cart;
            state = { ...checkout };
            state.data.cart = updatedCart;
            setCheckout(state);
            formik.setFieldValue('giftCard', '');
        } else {
            formik.setFieldError('giftCard', "The gift card code isn't valid. Verify the code and try again.");
        }
    };

    const handleRemoveGift = async (code) => {
        let state = { ...checkout };
        const cartId = state.data.cart.id;
        const result = await removeGiftCardFromCart({
            variables: {
                cartId,
                code,
            },
        });

        if (result && result.data) {
            const updatedCart = result.data.removeGiftCardFromCart.cart;
            state = { ...checkout };
            state.data.cart = updatedCart;
            setCheckout(state);
        }
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
                disabled={checkout.data.isCouponAppliedToCart || checkout.loading.coupon}
                loading={checkout.loading.coupon}
                error={!!formik.errors.coupon}
                errorMessage={formik.errors.coupon}
                styles={styles}
            />
            {customerFeautres.giftCard ? (
                <div>
                    <FieldPoint
                        id="giftCard"
                        placeholder="Gift Card Code"
                        action={() => {
                            handleApplyGift();
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.giftCard}
                        disabled={checkout.loading.giftCard}
                        loading={checkout.loading.giftCard}
                        error={!!formik.errors.giftCard}
                        errorMessage={formik.errors.giftCard}
                        styles={styles}
                    />
                    <Button variant="text" onClick={handleCheckBalance} className={styles.btnBalanceGift}>
                        <Typography variant="p" decoration="underline" letter="capitalize">
                            Check Balance
                        </Typography>
                    </Button>
                    <div>
                        <Typography variant="p" letter="capitalize">
                            Your Gift Card
                        </Typography>
                        {giftCards.map((item, index) => (
                            <Chip
                                key={index}
                                size="small"
                                label={item.giftcard_code}
                                onClick={() => {
                                    handleApplyGift(item.giftcard_code);
                                }}
                                icon={<Face />}
                            />
                        ))}
                    </div>
                    <div>
                        <Typography variant="p" letter="capitalize">
                            Applied Gift Card
                        </Typography>
                        {checkout.data.cart
                            && checkout.data.cart.applied_giftcard.giftcard_detail.map((item, index) => (
                                <Chip
                                    key={index}
                                    size="small"
                                    label={item.giftcard_code}
                                    onDelete={() => {
                                        handleRemoveGift(item.giftcard_code);
                                    }}
                                    icon={<Face />}
                                />
                            ))}
                    </div>
                </div>
            ) : null}
            {customerFeautres.rewardPoint ? (
                <div className={styles.cardPoint}>
                    <div className="column">
                        <Typography variant="span" letter="capitalize">
                            My Point
                        </Typography>
                        <Typography variant="title" type="bold" className={styles.pointText}>
                            {checkout.data.point.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                        </Typography>
                    </div>
                    <div>
                        <Button variant="outlined" className={styles.btnPoint} onClick={handleUsePoint}>
                            <Typography variant="p" type="bold" letter="uppercase">
                                USE MY POIN
                            </Typography>
                        </Button>
                    </div>
                </div>
            ) : null}
            {store_credit && (store_credit.enabled || customerFeautres.storeCredit) ? (
                <div className={styles.cardPoint}>
                    <div className="column">
                        <Typography variant="span" letter="capitalize">
                            {store_credit.is_use_store_credit ? 'Used Credit' : 'My Credit'}
                        </Typography>
                        <Typography variant="title" type="bold" className={styles.pointText}>
                            {credit.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                        </Typography>
                    </div>
                    <div>
                        <Button variant="outlined" className={styles.btnPoint} disabled={checkout.loading.storeCredit} onClick={handleUseCredit}>
                            <Typography
                                color={checkout.loading.storeCredit ? 'white' : 'default'}
                                variant="p"
                                type="bold"
                                letter="uppercase"
                                align="center"
                            >
                                {store_credit.is_use_store_credit ? 'remove credit' : 'use my credit'}
                            </Typography>
                            {checkout.loading.storeCredit && (
                                <CircularProgress
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: -9,
                                        marginLeft: -9,
                                        color: 'black',
                                    }}
                                    size={18}
                                />
                            )}
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default DiscountSection;
