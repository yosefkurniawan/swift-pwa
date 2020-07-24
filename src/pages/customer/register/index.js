import Layout from '@layout';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('customer:register:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:register:title'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'validate'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
