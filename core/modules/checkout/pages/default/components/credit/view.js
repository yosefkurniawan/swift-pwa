import Button from '@common_button';
import Typography from '@common_typography';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import { formatPrice } from '@helper_currency';
import CircularProgress from '@material-ui/core/CircularProgress';

const StoreCreditView = (props) => {
    const styles = useStyles();
    const {
        store_credit, credit, storeConfig, checkout, handleUseCredit, total, t, currencyCache,
    } = props;
    return (
        <div className={styles.cardPoint} id="checkoutUserCredit">
            <div className="column">
                <Typography variant="span" letter="capitalize">
                    {store_credit.is_use_store_credit ? t('checkout:myCredit:used') : t('checkout:myCredit:title')}
                </Typography>
                <Typography variant="span" type="bold" className={styles.pointText}>
                    {formatPrice(
                        `${credit}`.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                        }),
                        storeConfig.default_display_currency_code,
                        currencyCache,
                    )}
                </Typography>
            </div>
            <div>
                <Button
                    variant="outlined"
                    className={styles.btnPoint}
                    disabled={!!(checkout.loading.storeCredit || !!(total === 0 && !store_credit.is_use_store_credit))}
                    onClick={handleUseCredit}
                >
                    <Typography
                        color={checkout.loading.storeCredit || (total === 0 && !store_credit.is_use_store_credit) ? 'gray' : 'default'}
                        variant="p"
                        type="bold"
                        letter="uppercase"
                        align="center"
                    >
                        {store_credit.is_use_store_credit ? t('checkout:myCredit:removeButton') : t('checkout:myCredit:button')}
                    </Typography>
                    {checkout.loading.storeCredit && <CircularProgress className={styles.smallCircular} size={16} />}
                </Button>
            </div>
        </div>
    );
};

export default StoreCreditView;
