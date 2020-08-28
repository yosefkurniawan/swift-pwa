/* eslint-disable react/no-unescaped-entities */
import Typography from '@common_typography';
import Account from './desktop/account';
import Order from './desktop/order';
import Address from './desktop/address';
import Notification from './desktop/notification';
import useStyles from '../style';

const ViewDesktop = (props) => {
    const { t, userData } = props;
    const { customer, notification, customerOrders } = userData;
    const styles = useStyles();
    return (
        <div className="hidden-mobile">
            <Typography variant="h4" type="bold" letter="capitalize">
                {t('customer:menu:myAccount')}
            </Typography>
            <div className={styles.desktopContainer}>
                <Account customer={customer} styles={styles} t={t} />
                <Address customer={customer} styles={styles} t={t} />
                <Order customerOrders={customerOrders || {}} styles={styles} t={t} />
                <Notification notification={notification || {}} styles={styles} t={t} />

            </div>
        </div>
    );
};

export default ViewDesktop;
