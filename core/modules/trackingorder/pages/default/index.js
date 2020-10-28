import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from './core';
import Skeleton from './components/skeletonform';
import FormView from './components/form/view';
import ResultView from './components/result/view';
import SkeletonResult from './components/skeletonresult';
import DetailView from './components/modal';

const DefaultTracking = (props) => (
    <Core
        {...props}
        FormView={FormView}
        ResultView={ResultView}
        Skeleton={Skeleton}
        SkeletonResult={SkeletonResult}
        DetailView={DetailView}
    />
);

DefaultTracking.getInitialProps = async () => ({
    namespacesRequired: ['trackingorder', 'validate', 'contact'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultTracking));
