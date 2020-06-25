/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@components/Typography';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from './style';

const Loader = ({ styles }) => (
    <div className={styles.block}>
        <Skeleton variant="text" animation="wave" width="60%" height={30} />
        <Skeleton variant="rect" animation="wave" width="90%" height={70} />
    </div>
);

export default ({
    formik, t, styles, checkout,
}) => {
    const classes = useStyles();
    const checkStyles = (delivery) => ((formik.values.delivery === delivery)
        ? classNames(styles.cardPoint, classes.active) : styles.cardPoint);
    const handleSelect = (delivery) => {
        formik.setFieldValue('delivery', delivery);
    };
    if (checkout.loading.all) return <Loader styles={styles} />;
    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:deliveryMethod:label')}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} xl={6} className={classes.list}>
                    <div className={checkStyles('home')} onClick={() => handleSelect('home')}>
                        <div className="column">
                            <Typography variant="span" type="bold">
                                {t('checkout:deliveryMethod:homeDelivery')}
                            </Typography>
                            <Typography>
                                {t('checkout:deliveryMethod:homeDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={6} className={classes.list}>
                    <div className={checkStyles('pickup')} onClick={() => handleSelect('pickup')}>
                        <div className="column">
                            <Typography variant="span" type="bold">
                                {t('checkout:deliveryMethod:pickupDelivery')}
                            </Typography>
                            <Typography>
                                {t('checkout:deliveryMethod:pickupDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
