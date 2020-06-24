import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import dynamic from 'next/dynamic';

const Content = dynamic(() => import('./components'), { ssr: false });

const Page = (props) => {
    const pageConfig = {
        title: 'Gift Card',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Gift Card',
        bottomNav: false,
    };
    return (
        <Layout {...props} pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
    withAuth: true,
});

export default withTranslation()(Page);
