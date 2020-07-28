/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import TagManager from 'react-gtm-module';
import useStyles from './style';
import gqlService from '../../services/graphql';

const Loader = ({ styles }) => (
    <div className={styles.block}>
        <Skeleton variant="text" animation="wave" width="60%" height={30} />
        <Skeleton variant="rect" animation="wave" width="90%" height={70} />
    </div>
);

export default ({
    t, styles, checkout, setCheckout,
    handleOpenMessage, storeConfig,
}) => {
    const classes = useStyles();
    const [removePickupStore] = gqlService.removePickupStore();
    const checkStyles = (delivery) => ((checkout.selected.delivery === delivery)
        ? classNames(styles.cardPoint, classes.active) : styles.cardPoint);
    const handleSelect = async (delivery) => {
        await window.backdropLoader(true);
        if (delivery === 'home'
            && Object.keys(checkout.selectStore).length > 0
            && Object.keys(checkout.pickupInformation).length > 0) {
            removePickupStore({
                variables: {
                    cart_id: checkout.data.cart.id,
                },
            }).then(async (res) => {
                await setCheckout({
                    ...checkout,
                    data: {
                        ...checkout.data,
                        cart: res.data.removePickupStore,
                    },
                    selected: {
                        ...checkout.selected,
                        delivery,
                    },
                    selectStore: {},
                    pickupInformation: {},
                });
                await window.backdropLoader(false);
            }).catch(() => {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:problemConnection'),
                });
                window.backdropLoader(false);
            });
        } else if (delivery === 'pickup') {
            const selectedShipping = checkout.data.shippingMethods.filter(({ method_code }) => method_code === 'pickup');
            const dataLayer = {
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: {
                            step: 2,
                            option: selectedShipping.length > 0 ? selectedShipping[0].label : 'Pickup at Store Pickup at Store',
                            action: 'checkout',
                        },
                        products: checkout.data.cart.items.map(({ quantity, product, prices }) => ({
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
                        actionField: {
                            step: 2,
                            option: selectedShipping.length > 0 ? selectedShipping[0].label : 'Pickup at Store Pickup at Store',
                            action: 'checkout_option',
                        },
                    },
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
            TagManager.dataLayer({
                dataLayer: dataLayerOption,
            });
            window.backdropLoader(false);
            await setCheckout({
                ...checkout,
                selected: {
                    ...checkout.selected,
                    delivery,
                },
            });
        } else {
            await setCheckout({
                ...checkout,
                selected: {
                    ...checkout.selected,
                    delivery,
                },
            });
            window.backdropLoader(false);
        }
    };
    if (checkout.loading.all) return <Loader styles={styles} />;
    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:deliveryMethod:label')}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} xl={6} className={classes.list}>
                    <div className={checkStyles('home')} onClick={() => handleSelect('home')}>
                        <div className="column">
                            <Typography variant="span" type="bold">
                                {t('checkout:deliveryMethod:homeDelivery')}
                            </Typography>
                            <Typography>
                                {t('checkout:deliveryMethod:homeDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={6} className={classes.list}>
                    <div className={checkStyles('pickup')} onClick={() => handleSelect('pickup')}>
                        <div className="column">
                            <Typography variant="span" type="bold">
                                {t('checkout:deliveryMethod:pickupDelivery')}
                            </Typography>
                            <Typography>
                                {t('checkout:deliveryMethod:pickupDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
