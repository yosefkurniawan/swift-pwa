import { withTranslation } from '@i18n';
import Layout from '@components/Layouts';
import cookies from 'next-cookies';
import { nameToken } from '@config';
import { getTokenFromServer } from '@helpers/token';
import WithToken from './component/WithToken';
import WihtOutToken from './component/WihtOutToken';

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

Page.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
    const token = getTokenFromServer(allCookies[nameToken]);
    return {
        token,
        storeConfig: allCookies.storeConfig,
        namespacesRequired: ['common', 'customer'],
    };
};

export default withTranslation()(Page);
