/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import { modules } from '@config';
import useStyles from '@core_modules/checkout/pages/default/components/delivery/style';
import useStylesRoot from '@core_modules/checkout/pages/default/components/style';
import classNames from 'classnames';

const ShippingView = (props) => {
    const {
        checkout, handleSelect, t,
    } = props;
    const classes = useStyles();
    const styles = useStylesRoot();
    const checkStyles = (delivery) => ((checkout.selected.delivery === delivery)
        ? classNames(classes.item, classes.active, `${delivery}Delivery`)
        : classNames(classes.item, `${delivery}Delivery`));

    return (
        <div id="checkoutDeliveryMethod" className={classNames(styles.block, styles.deliveryCard)}>
            <Typography variant="h2" type="bold" letter="uppercase">
                {t('checkout:deliveryMethod:label')}
            </Typography>
            <div className="row">
                <div className="col-xs-6">
                    <div className={checkStyles('home')} onClick={() => handleSelect('home')}>
                        <div className="column">
                            <Typography variant="span" type="bold">
                                {t('checkout:deliveryMethod:homeDelivery')}
                            </Typography>
                            <Typography className="hidden-mobile">
                                {t('checkout:deliveryMethod:homeDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </div>
                {modules.checkout.pickupStore.enabled && (
                    <div className="col-xs-6">
                        <div className={checkStyles('pickup')} onClick={() => handleSelect('pickup')}>
                            <div className="column">
                                <Typography variant="span" type="bold">
                                    {t('checkout:deliveryMethod:pickupDelivery')}
                                </Typography>
                                <Typography className="hidden-mobile">
                                    {t('checkout:deliveryMethod:pickupDeliveryDesc')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
                {modules.checkout.inStorePickup.enabled && (
                    <div className="col-xs-6">
                        <div className={checkStyles('instore')} onClick={() => handleSelect('instore')}>
                            <div className="column">
                                <Typography variant="span" type="bold">
                                    {t('checkout:deliveryMethod:instorePickup')}
                                </Typography>
                                <Typography className="hidden-mobile">
                                    {t('checkout:deliveryMethod:instorePickupDesc')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShippingView;
