import Layout from '@layout';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('otp:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('otp:title'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'otp'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
