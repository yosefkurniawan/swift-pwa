import Typography from '@components/Typography';
import classNames from 'classnames';
import moment from 'moment';
import { formatPrice } from '@helpers/currency';
import Alert from '@material-ui/lab/Alert';
import useStyles from './style';

const ItemProduct = ({
    name, price, qty_ordered, currency,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <img src="/assets/img/sample/product.png" className={styles.productImg} alt="[product name]" />
            <div className={styles.detailItem}>
                <Typography variant="label">{name || ''}</Typography>
                <Typography variant="span">{formatPrice(price, currency)}</Typography>
                <Typography variant="span" className={styles.textDetail}>
                    Color : Black
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    Size : M
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    Qty :
                    {qty_ordered || 0}
                </Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

const DetailOrder = ({ t, detail, currency }) => {
    const styles = useStyles();
    if (detail.length > 0) {
        return (
            <div className="column">
                <div className={classNames(styles.block, styles.detail)}>
                    <Typography variant="title" letter="uppercase" type="bold">
                        {t('order:order')}
                        {' '}
                        {detail[0].status_label || ''}
                    </Typography>
                    <Typography variant="span">{moment().format('MMM DD, YYYY')}</Typography>
                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                        SHIPPED TO
                    </Typography>
                    <Typography variant="span" align="center">
                        {detail[0].detail[0].shipping_address.firstname || ''}
                        <br />
                        {' '}
                        {detail[0].detail[0].shipping_address.street || ''}
                        <br />
                        {' '}
                        {detail[0].detail[0].shipping_address.city || ''}
                        {detail[0].detail[0].shipping_address.region || ''}
                        {detail[0].detail[0].shipping_address.country_id || ''}
                        <br />
                        {detail[0].detail[0].shipping_address.telephone || ''}
                    </Typography>
                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                        shipping method
                    </Typography>
                    <Typography variant="span">{detail[0].detail[0].shipping_methods.shipping_description || ''}</Typography>
                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                        payment method
                    </Typography>
                    <Typography variant="span">{detail[0].detail[0].payment.additional_information[0] || ''}</Typography>
                </div>
                <div className={styles.block}>
                    {detail.length > 0
                        && detail[0].detail[0].items.length > 0
                        && detail[0].detail[0].items.map((item, key) => (
                            <ItemProduct key={key} {...item} currency={currency} />
                        ))}
                </div>
                <div className={styles.block}>
                    {
                        detail[0].detail[0].subtotal && (
                            <div className={styles.listSummary}>
                                <Typography variant="span" letter="capitalize">
                                    Sub total
                                </Typography>
                                <Typography variant="span" letter="capitalize">
                                    { formatPrice(detail[0].detail[0].subtotal, currency) }
                                </Typography>
                            </div>
                        )
                    }
                    {
                        detail[0].detail[0].payment && (
                            <div className={styles.listSummary}>
                                <Typography variant="span" letter="capitalize">
                                    Shipping
                                </Typography>
                                <Typography variant="span" letter="capitalize">
                                    { formatPrice(detail[0].detail[0].payment.shipping_amount, currency) }
                                </Typography>
                            </div>
                        )
                    }
                    {
                        detail[0].detail[0].discount_amount && (
                            <div className={styles.listSummary}>
                                <Typography variant="span" letter="capitalize">
                                    Discount
                                </Typography>
                                <Typography variant="span" letter="capitalize">
                                    { formatPrice(detail[0].detail[0].discount_amount, currency) }
                                </Typography>
                            </div>
                        )
                    }
                    <div className={styles.listSummary}>
                        <Typography variant="title" type="bold" letter="capitalize">
                            Total
                        </Typography>
                        <Typography variant="title" type="bold" letter="capitalize">
                            { detail[0].detail[0].grand_total && formatPrice(detail[0].detail[0].grand_total, currency) }
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
    return <Alert className="m-15" severity="warning">{t('order:notFound')}</Alert>;
};

export default DetailOrder;
