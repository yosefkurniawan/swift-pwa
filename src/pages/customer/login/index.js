import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('customer:login:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:login:pageTitle'),
        headerBackIcon: 'close',
        bottomNav: false,
    };
    return (
        <Layout {...props} pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['common', 'customer', 'validate'],
    withAuth: true,
    query: ctx.query,
});

export default withTranslation()(Page);
