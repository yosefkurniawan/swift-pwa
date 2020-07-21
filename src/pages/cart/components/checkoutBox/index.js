import Slide from '@material-ui/core/Slide';
import Typography from '@components/Typography';
import Button from '@Button';
import Router from 'next/router';
import { formatPrice } from '@helpers/currency';
import useStyles from './style';

const CheckoutDrawer = ({ editMode, t, data }) => {
    const styles = useStyles();
    const handleOnCheckoutClicked = () => {
        Router.push('/checkout');
    };
    return (
        <Slide direction="up" in={!editMode} mountOnEnter unmountOnExit>
            <div className={styles.checkoutBox}>
                <div className={styles.summary}>
                    <Typography variant="span" type="bold" align="center" letter="capitalize" className={styles.subtotal}>
                        {t('common:subtotal')}
                    </Typography>
                    &nbsp;
                    <Typography variant="span" type="bold" align="center" letter="capitalize" className={styles.subtotal}>
                        {formatPrice(data.prices.grand_total.value, data.prices.grand_total.currency)}
                    </Typography>
                </div>
                <div className={styles.actions}>
                    <Button customRootStyle={{ width: 'fit-content' }} className={styles.goToCheckout} onClick={handleOnCheckoutClicked}>
                        {t('common:button:checkout')}
                    </Button>
                </div>
            </div>
        </Slide>
    );
};

export default CheckoutDrawer;
