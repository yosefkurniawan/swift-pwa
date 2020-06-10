import Skeleton from '@material-ui/lab/Skeleton';
import { GraphCustomer } from '../../../../services/graphql';
import FormCom from './form';
import useStyles from './style';

const TrackingCom = (props) => {
    const { isLogin } = props;
    const styles = useStyles();
    let customer = {};
    if (isLogin) {
        const { data, loading } = GraphCustomer.getCustomer();
        if (loading) {
            return (
                <>
                    <Skeleton className={styles.skeletonForm} variant="rect" width="100%" height={30} />
                    <Skeleton className={styles.skeletonForm} variant="rect" width="100%" height={30} />
                    <Skeleton className={styles.skeletonForm} variant="rect" width="100%" height={30} />
                </>
            );
        }
        if (data && data.customer) {
            customer = data.customer;
        }
    }

    return (
        <>
            <FormCom {...props} email={customer.email} />
        </>
    );
};

export default TrackingCom;
