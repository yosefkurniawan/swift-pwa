import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import dynamic from 'next/dynamic';

const WihtOutToken = dynamic(() => import('./component/WihtOutToken'), { ssr: false });
const WithToken = dynamic(() => import('./component/WithToken'), { ssr: false });

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
    namespacesRequired: ['common', 'customer', 'notification', 'order'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
