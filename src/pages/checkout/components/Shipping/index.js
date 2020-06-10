import Radio from '@components/Forms/Radio';
import Typography from '@components/Typography';
import TagManager from 'react-gtm-module';
import Skeleton from '@material-ui/lab/Skeleton';
import gqlService from '../../services/graphql';
import DeliveryItem from '../RadioDeliveryItem';

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const Shipping = ({
    t, checkout, setCheckout, updateFormik, handleOpenMessage, styles,
    storeConfig,
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

            let updatedCart = await setShippingMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: carrier_code,
                    methodCode: method_code,
                },
            });

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
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:problemConnection'),
                });
            }
        }
    };

    if (loading.shipping || loading.addresses || loading.all) {
        content = <Loader />;
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
