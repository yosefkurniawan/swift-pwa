import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import cookies from 'next-cookies';
import redirect from 'next-redirect';
import Content from './components';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('checkout:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('checkout:pageTitle'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
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
