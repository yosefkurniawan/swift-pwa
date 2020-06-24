import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import dynamic from 'next/dynamic';

const Component = dynamic(() => import('./components'), { ssr: false });

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('order:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:title'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Component {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
    withAuth: true,
});

export default withTranslation()(Page);
