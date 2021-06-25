import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@common_typography';
import useStyles from '@core_modules/paypal/pages/review/components/PlaceOrder/style';

const ShippingAddress = (props) => {
    const { t, handlePlaceOrder, paypalTokenData } = props;
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Button
                className={styles.btnCancel}
                href="/checkout"
                color="primary"
            >
                <Typography
                    variant="span"
                    color="white"
                    type="bold"
                    className={styles.btnLabel}
                >
                    {t('common:button:cancel')}
                </Typography>
            </Button>
            <Button
                className={styles.btnPlaceOrder}
                color="primary"
                onClick={handlePlaceOrder}
                disabled={paypalTokenData.loading}
            >
                <Typography
                    variant="span"
                    color="white"
                    type="bold"
                    className={styles.btnLabel}
                >
                    {t('checkout:placeOrder')}
                </Typography>
            </Button>
        </div>
    );
};

export default ShippingAddress;
