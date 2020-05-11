import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import WihtOutToken from './component/WihtOutToken';
import WithToken from './component/WithToken';

const Page = (props) => {
    const { t, token } = props;
    const pageConfig = {
        title: t('customer:dashboard:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'account',
    };
    if (token !== '' && token) {
        return (
            <Layout pageConfig={pageConfig}>
                <WithToken {...props} />
            </Layout>
        );
    }
    return (
        <Layout pageConfig={pageConfig}>
            <WihtOutToken {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default withTranslation()(Page);
