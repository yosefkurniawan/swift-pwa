import { withTranslation } from '@i18n';
import Layout from '@components/Layouts';
import dynamic from 'next/dynamic';

const Content = dynamic(() => import('./component'), { ssr: false });

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('wishlist:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('wishlist:pageTitle'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'wishlist'],
    withAuth: true,
});

export default withTranslation()(Page);
