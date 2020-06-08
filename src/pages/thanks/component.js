import Typography from '@components/Typography';
import Button from '@components/Button';
import Link from 'next/link';
import TagManager from 'react-gtm-module';
import Alert from '@material-ui/lab/Alert';
import { removeCheckoutData, getCheckoutData } from '@helpers/cookies';
import Router from 'next/router';
import { getOrder } from './services/graphql';
import Loader from './Loader';
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

    React.useEffect(() => {
        if (ordersFilter.data.length > 0) {
            const dataLayer = {
                title: t('checkout:thanks'),
                pageType: 'purchase',
                ecommerce: {
                    purchase: {
                        actionField: {
                            id: checkoutData.order_number,
                            affiliation: storeConfig.store_name || 'Swift PWA',
                            revenue: ordersFilter.data[0].detail[0].grand_total,
                            coupon: ordersFilter.data[0].detail[0].coupon.is_use_coupon ? ordersFilter.data[0].detail[0].coupon.code : '',
                            tax: ordersFilter.data[0].detail[0].tax_amount,
                            shipping: ordersFilter.data[0].detail[0].payment.shipping_amount,
                            product: ordersFilter.data[0].detail[0].items.map((product) => ({
                                name: product.name,
                                id: product.sku,
                                category: product.categories[0].name || '',
                                price: product.price,
                                list: product.categories[0].name || '',
                                quantity: product.qty_ordered,
                                dimension4: product.quantity_and_stock_status.is_in_stock ? 'In stock' : 'Out stock',
                                dimension5: JSON.stringify(product.rating.total),
                                dimension6: JSON.stringify(product.rating.value),
                                dimension7: ordersFilter.data[0].detail[0].discount_amount !== 0 ? 'YES' : 'NO',
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
    }, [ordersFilter]);

    if (loading || !data) return <Loader />;
    if (error) {
        return (
            <div className={styles.container}>
                <Alert className="m-15" severity="error">
                    {error.message.split(':')[1]}
                </Alert>
            </div>
        );
    }
    if (data && data.ordersFilter) ordersFilter = data.ordersFilter;
    const handleCotinue = () => {
        const cdt = getCheckoutData();
        if (cdt) removeCheckoutData();
        Router.push('/');
    };
    React.useEffect(() => function cleanup() {
        if (typeof window !== 'undefined') {
            const cdt = getCheckoutData();
            if (cdt) removeCheckoutData();
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
            {isLogin && isLogin === 1 ? (
                <Link href="/sales/order/view/order_id/[id]" as={`/sales/order/view/order_id/${checkoutData.order_number}`}>
                    <a>
                        <Typography variant="span" type="regular" letter="capitalize" decoration="underline">
                            {t('checkout:checkOrder')}
                        </Typography>
                    </a>
                </Link>
            ) : null}
            <div className={styles.footer}>
                <Button className={styles.btnContinue} color="primary" onClick={handleCotinue}>
                    <Typography variant="title" type="regular" letter="capitalize" className={styles.textBtn}>
                        {t('checkout:continue')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default ThanksPage;
