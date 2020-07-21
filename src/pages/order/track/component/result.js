/* eslint-disable prefer-destructuring */
import Alert from '@material-ui/lab/Alert';
import Typography from '@Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { formatPrice } from '@helpers/currency';
import useStyles from './style';
import SkeleteonTracking from './skeleton';
import { getTrackingOrder } from '../../services/graphql';

const generateData = (styles, t, orders) => {
    const data = orders.data[0];
    if (orders.data.length > 0) {
        let { detail } = data;
        detail = detail[0];
        const items = [
            { primary: t('order:orderStatus'), secondary: data.status_label },
            { primary: t('order:shippedTo'), secondary: `${detail.shipping_address.firstname} ${detail.shipping_address.lastname}` },
            { primary: t('order:orderId'), secondary: data.order_number },
            { primary: t('order:status'), secondary: data.status },
            { primary: t('order:orderTotal'), secondary: formatPrice(data.grand_total, 'USD') },
            { primary: t('order:paymentMethod'), secondary: detail.payment.payment_additional_info.method_title },
            { primary: t('order:shippingMethod'), secondary: detail.shipping_methods.shipping_description },
        ];
        return (
            <List>
                {items.map((item, i) => (
                    <ListItem key={i}>
                        <ListItemText
                            primary={(
                                <Typography letter="capitalize">
                                    {item.primary}
                                </Typography>
                            )}
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="span" type="bold">
                                {item.secondary}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }
    return <Alert severity="warning">{t('order:orderNotFound')}</Alert>;
};

const Result = ({ t, orderField }) => {
    const { email, order_id } = orderField;
    const styles = useStyles();
    const { loading, data } = getTrackingOrder({ email, order_id });
    return (
        <>
            {loading ? <SkeleteonTracking /> : (
                generateData(styles, t, data.ordersFilter)
            )}
        </>
    );
};

export default Result;
