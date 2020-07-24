import Layout from '@layout';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Content from './components';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('payment:confirmPayment:label'),
        headerTitle: t('payment:confirmPayment:label'),
        bottomNav: false,
        pageType: 'other',
        header: 'relative',
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'payment'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
