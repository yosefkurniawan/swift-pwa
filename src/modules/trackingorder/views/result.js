/* eslint-disable prefer-destructuring */
import SkeleteonTracking from './skeletonform';
import { getTrackingOrder } from '../services';

const Result = ({ t, orderField, ResultView }) => {
    const { email, order_id } = orderField;
    const { loading, data } = getTrackingOrder({ email, order_id });
    return (
        <>
            {loading ? <SkeleteonTracking /> : (
                <ResultView t={t} orders={data.ordersFilter} />
            )}
        </>
    );
};

export default Result;
