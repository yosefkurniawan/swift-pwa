import Radio from '@components/Forms/Radio';
import Typography from '@components/Typography';
import gqlService from '../../services/graphql';
import DeliveryItem from '../RadioDeliveryItem';

const Shipping = ({
    t,
    checkout,
    setCheckout,
    updateFormik,
    handleOpenMessage,
    styles,
}) => {
    const { loading, data, selected } = checkout;
    const [setShippingMethod] = gqlService.setShippingMethod({ onError: () => {} });
    let content;

    const handleShipping = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            const { carrier_code, method_code } = val.name;
            let state = { ...checkout };
            state.selected.shipping = val;
            state.status.backdrop = true;
            setCheckout(state);

            let updatedCart = (
                await setShippingMethod({
                    variables: {
                        cartId: cart.id,
                        carrierCode: carrier_code,
                        methodCode: method_code,
                    },
                })
            );

            state = { ...checkout };
            state.status.backdrop = false;
            setCheckout(state);

            if (updatedCart) {
                updatedCart = updatedCart.data.setShippingMethodsOnCart.cart;
                updateFormik(updatedCart);

                const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
                    ...method,
                    label: method.title,
                    value: method.code,
                    image: null,
                }));

                state = { ...checkout };
                state.data.paymentMethod = paymentMethod;
                state.data.summary.prices = updatedCart.prices;
                state.data.summary.items = updatedCart.items;
                state.data.summary.shipping_addresses = updatedCart.shipping_addresses;
                setCheckout(state);
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:problemConnection'),
                });
            }
        }
    };

    if (loading.shipping || loading.addresses || loading.all) {
        content = <Typography variant="p">Loading</Typography>;
    } else if (data.shippingMethods.length !== 0) {
        content = (
            <Radio
                value={selected.shipping}
                onChange={handleShipping}
                classContainer={styles.listShipping}
                CustomItem={DeliveryItem}
                valueData={data.shippingMethods}
            />
        );
    } else {
        content = <Typography variant="p">{t('checkout:noShipping')}</Typography>;
    }

    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:deliveryMethod')}
            </Typography>
            {content}
        </div>
    );
};

export default Shipping;
