import Button from '@components/Button';
import Typography from '@components/Typography';
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
    const [removeCouponFromCart] = gqlService.removeCouponFromCart();

    const handleGift = () => {};
    const handleCheckBalance = () => {};
    const handleUsePoint = async () => {};
    const handleUseCredit = async () => {};
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
            state.data.summary.prices = cart.prices;
            state.data.summary.items = cart.items;
            state.data.summary.shipping_addresses = cart.shipping_addresses;
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
            <FieldPoint placeholder="Gift Card Number" action={handleGift} styles={styles} />
            <div>
                <Button variant="text" onClick={handleCheckBalance} className={styles.btnBalanceGift}>
                    <Typography variant="p" decoration="underline" letter="capitalize">
                        Check Balance
                    </Typography>
                </Button>
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
                <div className={styles.cardPoint}>
                    <div className="column">
                        <Typography variant="span" letter="capitalize">
                            My Credit
                        </Typography>
                        <Typography variant="title" type="bold" className={styles.pointText}>
                            {checkout.data.credit.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                        </Typography>
                    </div>
                    <div>
                        <Button variant="outlined" className={styles.btnPoint} onClick={handleUseCredit}>
                            <Typography variant="p" type="bold" letter="uppercase" align="center">
                                use my credit
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountSection;
