import Core from './core';
import Skeleton from './views/skeletonform';

const DefaultTracking = (props) => {
    const {
        pageConfig, t, FormView, ResultView, Layout,
    } = props;
    const config = {
        title: t('trackingorder:trackingOrder'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('trackingorder:trackingOrder'),
        bottomNav: false,
    };

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Core {...props} FormView={FormView} ResultView={ResultView} Skeleton={Skeleton} />
        </Layout>
    );
};

export default DefaultTracking;
