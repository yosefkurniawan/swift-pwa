import PropTypes from 'prop-types';
import { getCustomer } from './services';
import Content from './views/index';

const Tracking = (props) => {
    const { isLogin, Skeleton } = props;
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
    return <Content {...props} email={customer.email || ''} />;
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
