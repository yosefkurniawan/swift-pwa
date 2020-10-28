/* eslint-disable prefer-destructuring */
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import Button from '@common_button';
import classNames from 'classnames';
import { startCase } from 'lodash';
import useStyles from '../style';

const resultItem = ({ t, orders, storeConfig, openModal }) => {
    const styles = useStyles();
    const data = orders.data[0];
    if (orders.data.length > 0) {
        let { detail } = data;
        detail = detail[0];
        let isShiper = !detail.shipping_methods.shipping_description.match(/go-send/i);
        const items = [
            { primary: t('trackingorder:orderStatus'), secondary: data.status_label },
            {
                primary: t('trackingorder:shippedTo'),
                secondary: `${detail.shipping_address.firstname} ${detail.shipping_address.lastname}`,
            },
            { primary: t('trackingorder:orderId'), secondary: data.order_number },
            { primary: t('trackingorder:status'), secondary: data.status_label || data.status },
            {
                primary: t('trackingorder:orderTotal'),
                secondary: formatPrice(data.grand_total, storeConfig.base_currency_code),
            },
            {
                primary: t('trackingorder:paymentMethod'),
                secondary: detail.payment.payment_additional_info.method_title,
            },
            {
                primary: t('trackingorder:shippingMethod'),
                secondary: detail.shipping_methods.shipping_description,
            },
        ];

        if (detail.shipping_methods.shipping_detail[0].data_detail) {
            let dt = detail.shipping_methods.shipping_detail[0].data_detail;
            if (dt.includes(':')) {
                dt = dt.replace(/'/g, '`');
                dt = dt.replace(/"/g, "'");
                dt = dt.replace(/`/g, '"');
                dt = JSON.parse(dt);
                if (!isShiper) {
                    items.push({
                        primary: t('trackingorder:trackingOrder'),
                        secondary: (
                            <Button variant="text" onClick={openModal}>
                                <Typography type="bold" decoration="underline">
                                    {dt.orderNo}
                                </Typography>
                            </Button>
                        ),
                    });
                } else {
                    items.push({
                        primary: t('trackingorder:trackingOrder'),
                        secondary: detail.shipping_methods.track_number,
                    });
                    items.push({
                        primary: '',
                        secondary: '',
                    });
                    Object.keys(dt).map((key) => {
                        items.push({
                            primary: startCase(key),
                            secondary: dt[key],
                        });
                    });
                }
            } else {
                items.push({
                    primary: t('trackingorder:trackingOrder'),
                    secondary: detail.shipping_methods.track_number,
                });
            }
        }
        return (
            <div className={classNames(styles.container, 'row')}>
                <div className="col-xs-12">
                    <Divider />
                </div>
                <div className="col-xs-12">
                    <Typography variant="title" size="16" className="label-result">
                        {t('trackingorder:trackingInformation')}
                    </Typography>
                </div>
                <div className="col-xs-12">
                    <List>
                        {items.map((item, i) => (
                            <ListItem key={i}>
                                <ListItemText
                                  className={styles.label}
                                  primary={(
                                    <Typography align="left" letter="capitalize" className="clear-margin-padding">{item.primary}</Typography>
                                  )} />
                                <ListItemSecondaryAction className={styles.detail}>
                                    <Typography variant="span" type="regular" className="clear-margin-padding">
                                        {item.secondary}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <style jsx global>
                    {`
                        .label-result {
                            font-size: 20px;
                            margin-top: 30px;
                        }
                    `}
                </style>
            </div>
        );
    }
    return <Alert severity="warning">{t('trackingorder:orderNotFound')}</Alert>;
};

export default resultItem;
