import Typography from '@components/Typography';
import Button from '@components/Button';
import Link from 'next/link';
import TagManager from 'react-gtm-module';
import { getOrder } from './services/graphql';
import useStyles from './style';

const ThanksPage = (props) => {
    const {
        t,
        isLogin,
        storeConfig,
        checkoutData,
    } = props;
    const styles = useStyles();
    let ordersFilter = {
        data: [],
    };
    const { data, loading, error } = getOrder(checkoutData);

    if (loading || !data) return <p>Loading</p>;
    if (error) return <p>error</p>;
    if (data && data.ordersFilter) ordersFilter = data.ordersFilter;

    React.useEffect(() => {
        if (ordersFilter.data.length > 0) {
            const dataLayer = {
                ecommerce: {
                    purchase: {
                        actionField: {
                            id: checkoutData.order_number,
                            affiliation: '',
                            revenue: ordersFilter.data[0].detail[0].grand_total,
                            coupon: '',
                            tax: ordersFilter.data[0].detail[0].tax_amount,
                            shipping: ordersFilter.data[0].detail[0].payment.shipping_amount,
                            product: ordersFilter.data[0].detail[0].items.map((product) => ({
                                name: product.name,
                                id: product.sku,
                                category: '',
                                price: product.price,
                                list: '',
                                quantity: product.qty_ordered,
                                dimension4: '',
                                dimension5: '',
                                dimension6: '',
                                dimension7: '',
                            })),
                        },
                    },
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
        }
    }, []);
    return (
        <div className={styles.container}>
            <Typography variant="h1" type="bold" align="center">
                {t('checkout:thanks')}
                {' '}
                <br />
                {t('checkout:forOrder')}
            </Typography>
            <Typography variant="span" align="center">
                {t('checkout:thanksDetail')}
            </Typography>
            <Typography variant="span" align="center">
                {t('checkout:yourOrderId')}
            </Typography>
            <Typography variant="title" type="bold" align="center">
                {checkoutData.order_number}
            </Typography>
            {isLogin && isLogin === 1 && (
                <Link href="/sales/order/view/order_id/[id]" as={`/sales/order/view/order_id/${parseInt(checkoutData.order_id, 0)}`}>
                    <a>
                        <Typography variant="span" type="regular" letter="capitalize" decoration="underline">
                            {t('checkout:checkOrder')}
                        </Typography>
                    </a>
                </Link>
            )}
            <div className={styles.footer}>
                <Button className={styles.btnContinue} color="primary" href="/">
                    <Typography variant="title" type="regular" letter="capitalize" className={styles.textBtn}>
                        {t('checkout:continue')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default ThanksPage;
