import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import WihtOutToken from './component/WihtOutToken';
import WithToken from './component/WithToken';

const Page = (props) => {
    const { t, isLogin } = props;
    const pageConfig = {
        title: t('customer:dashboard:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'account',
    };
    if (isLogin) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <WithToken {...props} />
            </Layout>
        );
    }
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <WihtOutToken {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default withTranslation()(Page);
