import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import cookies from 'next-cookies';
import redirect from 'next-redirect';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Content = dynamic(() => import('./components'), { ssr: false });

const snapUrl = {
    dev: 'https://app.sandbox.midtrans.com/snap/snap.js',
    prod: 'https://app.midtrans.com/snap/snap.js',
};

const Page = (props) => {
    const { t, storeConfig } = props;
    const { snap_is_production, snap_client_key } = storeConfig;
    const pageConfig = {
        title: t('checkout:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('checkout:pageTitle'),
        bottomNav: false,
        pageType: 'checkout',
    };

    const url = snap_is_production ? snapUrl.dev : snapUrl.prod;

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Head>
                <script
                    type="text/javascript"
                    src={url}
                    data-client-key={snap_client_key}
                />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async (ctx) => {
    const cartId = cookies(ctx).nci || null;

    if (!cartId) {
        redirect(ctx, '/checkout/cart');
    }

    return {
        namespacesRequired: ['common', 'checkout', 'validate'],
        cartId,
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
