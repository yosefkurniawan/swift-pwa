import Radio from '@components/Forms/Radio';
import Typography from '@components/Typography';
import gqlService from '../../services/graphql';
import DeliveryItem from '../RadioDeliveryItem';

const Payment = ({
    checkout,
    setCheckout,
    updateFormik,
    handleOpenMessage,
    t,
    styles,
}) => {
    const { loading, data, selected } = checkout;
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => {} });
    let content;

    const handlePayment = async (val) => {
        const { cart } = checkout.data;
        let state = { ...checkout };
        state.selected.payment = val;
        state.status.backdrop = true;
        setCheckout(state);

        const result = await setPaymentMethod({ variables: { cartId: cart.id, code: val } });

        state = { ...checkout };
        state.status.backdrop = false;
        setCheckout(state);

        if (result) {
            updateFormik(result.data.setPaymentMethodOnCart.cart);
        } else {
            handleOpenMessage({
                variant: 'error',
                text: t('checkout:message:problemConnection'),
            });
        }
    };

    if (loading.payment || loading.shipping || loading.all) {
        content = <Typography variant="p">Loading</Typography>;
    } else if (data.paymentMethod.length !== 0) {
        content = (
            <>
                <Typography variant="p">{t('checkout:paymentSubtitle')}</Typography>
                <Radio
                    value={selected.payment}
                    onChange={handlePayment}
                    valueData={data.paymentMethod}
                    CustomItem={DeliveryItem}
                    propsItem={{
                        borderBottom: false,
                        RightComponent: true,
                    }}
                />
            </>
        );
    } else {
        content = <Typography variant="p">{t('checkout:noPayment')}</Typography>;
    }

    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:payment')}
            </Typography>
            <div>{content}</div>
        </div>
    );
};

export default Payment;
