import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Layout from '@components/Layouts';
import FormView from '../../modules/trackingorder/views/template/form';
import ResultView from './template/result';
import Skeleton from '../../modules/trackingorder/views/skeletonform';
import TrackingOrder from '../../modules/trackingorder/base';

const DefaultTracking = (props) => {
    console.log(props);
    return (
        <TrackingOrder
            {...props}
            Layout={Layout}
            FormView={FormView}
            ResultView={ResultView}
            Skeleton={Skeleton}
        />
    );
};

DefaultTracking.getInitialProps = async () => ({
    namespacesRequired: ['trackingorder', 'validate', 'contact'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultTracking));
