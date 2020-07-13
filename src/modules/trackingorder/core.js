import { getCustomer } from './services';
import Content from './views/index';

const Tracking = (props) => {
    const { isLogin, Skeleton } = props;
    console.log(isLogin);
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

export default Tracking;
