import Typography from '@components/Typography';
import Button from '@components/Button';
import Link from 'next/link';
import TagManager from 'react-gtm-module';
import { storeConfigNameCokie } from '@config';
import cookies from 'js-cookie';
import useStyles from './style';

const ThanksPage = (props) => {
    const {
        t,
        query: { order_id },
        token,
    } = props;
    const styles = useStyles();
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const storeConfig = cookies.getJSON(storeConfigNameCokie);
            TagManager.dataLayer({
                dataLayer: {
                    ecommerce: {
                        purchase: {
                            actionField: {
                                id: order_id,
                            },
                        },
                        currencyCode: storeConfig.base_currency_code || 'IDR',
                    },
                },
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
                {order_id}
            </Typography>
            {token && token !== '' && typeof token !== 'undefined' && (
                <Link href="/sales/order/view/order_id/[id]" as={`/sales/order/view/order_id/${parseInt(order_id, 0)}`}>
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
