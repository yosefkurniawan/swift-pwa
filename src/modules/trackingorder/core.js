import PropTypes from 'prop-types';
import Layout from '@components/Layouts';
import { getCustomer } from './services';
import Content from './views/index';

const Tracking = (props) => {
    const {
        isLogin, Skeleton, pageConfig, t,
    } = props;
    let customer = {};
    if (isLogin) {
        const { data, loading } = getCustomer();
        if (loading) {
            return (
                <Skeleton />
            );
        }
        if (data && data.customer) {
            customer = data.customer;
        }
    }

    const config = {
        title: t('trackingorder:trackingOrder'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('trackingorder:trackingOrder'),
        bottomNav: false,
    };
    return <Layout {...props} pageConfig={pageConfig || config}><Content {...props} email={customer.email || ''} /></Layout>;
};

Tracking.propTypes = {
    FormView: PropTypes.func,
    Skeleton: PropTypes.func,
    SkeletonResult: PropTypes.func,
    ResultView: PropTypes.func,
};

Tracking.defaultProps = {
    FormView: () => {},
    Skeleton: () => {},
    SkeletonResult: () => {},
    ResultView: () => {},
};

export default Tracking;
