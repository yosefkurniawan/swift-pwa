/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import classNames from 'classnames';
import useStyles from '@core_modules/checkout/pages/default/components/delivery/style';
import useStylesRoot from '@core_modules/checkout/pages/default/components/style';
import { GRAY_THIRD } from '@theme_color';

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
        <div id="checkoutDeliveryMethod" className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase" style={{ marginBottom: 25 }}>
                {t('checkout:deliveryMethod:label')}
            </Typography>
            <div className="row">
                <div className="col-xs-6">
                    <div className={checkStyles('home')} onClick={() => handleSelect('home')}>
                        <div className="column">
                            <Avatar style={{ marginBottom: 20, background: '#b8b5ff' }}>
                                <FolderIcon style={{ color: '#7868e6' }} />
                            </Avatar>
                            <div className="column">
                                <Typography variant="p" type="bold" style={{ fontSize: 16, lineHeight: 0.8 }}>
                                    {t('checkout:deliveryMethod:homeDelivery')}
                                </Typography>
                                <Typography className="hidden-mobile" style={{ color: GRAY_THIRD }}>
                                    {t('checkout:deliveryMethod:homeDeliveryDesc')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className={checkStyles('pickup')} onClick={() => handleSelect('pickup')}>
                        <div className="column">
                            <Avatar style={{ marginBottom: 20, background: '#b8b5ff' }}>
                                <FolderIcon style={{ color: '#7868e6' }} />
                            </Avatar>
                            <Typography variant="p" type="bold" style={{ fontSize: 16, lineHeight: 0.8 }}>
                                {t('checkout:deliveryMethod:pickupDelivery')}
                            </Typography>
                            <Typography className="hidden-mobile" style={{ color: GRAY_THIRD }}>
                                {t('checkout:deliveryMethod:pickupDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingView;
