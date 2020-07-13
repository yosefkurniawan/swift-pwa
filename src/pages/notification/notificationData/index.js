import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('notification:notificationData:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('notification:notificationData:pageTitle'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'notification'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
