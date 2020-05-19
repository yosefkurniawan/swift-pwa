import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import cookies from 'next-cookies';
import redirect from 'next-redirect';
import Head from 'next/head';
import Content from './components';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('checkout:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('checkout:pageTitle'),
        bottomNav: false,
        pageType: 'checkout',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Head>
                <script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-KyvADD67-pyuS-I6" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async (ctx) => {
    const token = cookies(ctx).sk || null;
    const cartId = cookies(ctx).nci || null;

    if (!token && !cartId) {
        redirect(ctx, '/checkout/cart');
    }

    return {
        namespacesRequired: ['common', 'checkout', 'validate'],
        cartId,
        token,
    };
};

export default withTranslation()(Page);
