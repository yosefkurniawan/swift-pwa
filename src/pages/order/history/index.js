import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Content from './components';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('order:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:title'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
    withAuth: true,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
