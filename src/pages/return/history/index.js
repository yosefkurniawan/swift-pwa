import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Component from './components';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('return:history'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('return:history'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'return'],
    withAuth: true,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
