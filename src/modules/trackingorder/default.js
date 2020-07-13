import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Core from './core';
import Skeleton from './views/skeletonform';
import FormView from './views/template/form';
import ResultView from './views/template/result';
import SkeletonResult from './views/skeletonresult';

const DefaultTracking = (props) => (
    <Core {...props} FormView={FormView} ResultView={ResultView} Skeleton={Skeleton} SkeletonResult={SkeletonResult} />
);

DefaultTracking.getInitialProps = async () => ({
    namespacesRequired: ['trackingorder', 'validate', 'contact'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultTracking));
