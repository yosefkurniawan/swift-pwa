import Layout from '@layout';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Component from './component';

const TrackingOrder = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('order:trackingOrder'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:trackingOrder'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <div>
                <Component {...props} />
            </div>
        </Layout>
    );
};

TrackingOrder.getInitialProps = async () => ({
    namespacesRequired: ['order', 'validate', 'contact'],
});

export default withApollo({ ssr: true })(withTranslation()(TrackingOrder));
