import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './component';

const Page = (props) => {
    const pageConfig = {
        title: 'Blog',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Blog',
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withTranslation()(Page);
