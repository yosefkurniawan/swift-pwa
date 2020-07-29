import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { formatPrice } from '@helpers/currency';
import DeliveryItem from '../../../../components/radioitem';
import useStyles from '../style';

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const ShippingView = (props) => {
    const styles = useStyles();
    const {
        checkout,
        storeConfig,
        loading,
        selected,
        handleShipping,
        data,
        t,
    } = props;
    let content;

    if (checkout.selected.delivery === 'pickup') {
        const price = formatPrice(0, storeConfig.base_currency_code || 'IDR');
        content = <DeliveryItem value={{ price }} label={t('checkout:pickupStore')} selected borderBottom={false} />;
    } else if (loading.shipping || loading.addresses || loading.all) {
        content = <Loader />;
    } else if (data.shippingMethods.length !== 0) {
        const index = data.shippingMethods.findIndex((x) => x.carrier_code === 'pickup');
        if (index >= 0) {
            data.shippingMethods.splice(index, 1);
        }
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
                {t('checkout:shippingMethod')}
            </Typography>
            {content}
        </div>
    );
};

export default ShippingView;
