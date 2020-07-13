import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Layout from '@components/Layouts';
import Core from './core';
import Skeleton from './views/skeletonform';
import FormView from './views/template/form';
import ResultView from './views/template/result';

const DefaultTracking = (props) => {
    const { pageConfig, t } = props;
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

DefaultTracking.getInitialProps = async () => ({
    namespacesRequired: ['trackingorder', 'validate', 'contact'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultTracking));
