import Layout from '@components/Layouts';
import { nameToken } from '@config';
import { getTokenFromServer } from '@helpers/token';
import { withTranslation } from '@i18n';
import cookies from 'next-cookies';
import Router from 'next/router';
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
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async (ctx) => {
    const allcookie = cookies(ctx);
    const token = getTokenFromServer(allcookie[nameToken]);
    if (token !== '' && token) {
        if (typeof window !== 'undefined') Router.push('/customer/account');
        else ctx.res.redirect('/customer/account');
    }
    return {
        namespacesRequired: ['common', 'customer', 'validate'],
        storeConfig: allcookie.storeConfig,
    };
};

export default withTranslation()(Page);
