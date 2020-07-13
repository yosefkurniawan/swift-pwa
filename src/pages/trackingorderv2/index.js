import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import FormView from '../../modules/trackingorder/views/template/form';
// custome result view
import ResultView from './template/result';

// get from current module
import Skeleton from '../../modules/trackingorder/views/skeletonform';
import SkeletonResult from '../../modules/trackingorder/views/skeletonresult';
import TrackingOrder from '../../modules/trackingorder/core';

const DefaultTracking = (props) => (
    <TrackingOrder
        {...props}
        FormView={FormView}
        ResultView={ResultView}
        Skeleton={Skeleton}
        SkeletonResult={SkeletonResult}
    />
);

DefaultTracking.getInitialProps = async () => ({
    namespacesRequired: ['trackingorder', 'validate', 'contact'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultTracking));
