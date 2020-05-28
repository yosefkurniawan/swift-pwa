import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Component from './components';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('customer:menu:rewardPoint'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:rewardPoint'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default withTranslation()(Page);
