/* eslint-disable prefer-destructuring */
import Alert from '@material-ui/lab/Alert';
import { formatPrice } from '@helpers/currency';
import useStyles from './style';
import SkeleteonTracking from './skeleton';
import { getTrackingOrder } from '../../services/graphql';

const generateData = (styles, t, orders) => {
    const data = orders.data[0];
    if (orders.data.length > 0) {
        let { detail } = data;
        detail = detail[0];
        return (
            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td className={styles.tColContent} style={{ width: '50%' }}>{t('order:orderStatus')}</td>
                        <td className={styles.tColContent} style={{ width: '2%' }}>:</td>
                        <td className={styles.tColContent}>{data.status_label}</td>
                    </tr>
                    <tr>
                        <td className={styles.tColContent}>{t('order:shippedTo')}</td>
                        <td className={styles.tColContent}>:</td>
                        <td className={styles.tColContent}>
                            {detail.shipping_address.firstname}
                            {' '}
                            {detail.shipping_address.lastname}
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.tColContent}>{t('order:orderId')}</td>
                        <td className={styles.tColContent}>:</td>
                        <td className={styles.tColContent}>{data.order_number}</td>
                    </tr>
                    <tr>
                        <td className={styles.tColContent}>{t('order:status')}</td>
                        <td className={styles.tColContent}>:</td>
                        <td className={styles.tColContent}>{data.status}</td>
                    </tr>
                    <tr>
                        <td className={styles.tColContent}>{t('order:orderTotal')}</td>
                        <td className={styles.tColContent}>:</td>
                        <td className={styles.tColContent}>
                            {formatPrice(
                                data.grand_total, 'USD',
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.tColContent}>{t('order:paymentMethod')}</td>
                        <td className={styles.tColContent}>:</td>
                        <td className={styles.tColContent}>{detail.payment.payment_additional_info.method_title}</td>
                    </tr>
                    <tr>
                        <td className={styles.tColContent}>{t('order:shippingMethod')}</td>
                        <td className={styles.tColContent}>:</td>
                        <td className={styles.tColContent}>{detail.shipping_methods.shipping_description}</td>
                    </tr>
                </tbody>
            </table>
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
