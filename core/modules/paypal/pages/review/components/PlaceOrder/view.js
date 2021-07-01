import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@common_typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '@core_modules/paypal/pages/review/components/PlaceOrder/style';

const ShippingAddress = (props) => {
    const {
        t, handlePlaceOrder, checkout,
    } = props;
    const styles = useStyles();
    let order = false;
    if (checkout && checkout.loading) {
        order = checkout.loading.order;
    }

    return (
        <div className={styles.container}>
            <Button
                className={styles.btnCancel}
                href="/checkout"
                color="primary"
                disabled={order}
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
                disabled={order}
            >
                <Typography
                    variant="span"
                    color="white"
                    type="bold"
                    className={styles.btnLabel}
                >
                    {t('checkout:placeOrder')}
                </Typography>
                {order && (
                    <CircularProgress
                        size={24}
                        className={styles.buttonProgress}
                    />
                )}
            </Button>
        </div>
    );
};

export default ShippingAddress;
