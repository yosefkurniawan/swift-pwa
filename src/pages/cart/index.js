import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import dynamic from 'next/dynamic';

const Content = dynamic(() => import('./components'), { ssr: false });

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('cart:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('cart:pageTitle'),
        headerBackIcon: 'close', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'cart',
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart', 'wishlist'],
});

export default withTranslation()(Page);
