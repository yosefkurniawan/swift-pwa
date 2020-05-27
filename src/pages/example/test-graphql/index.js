import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Content from './components';

const Page = (props) => {
    const pageConfig = {
        title: 'Test Graphql',
        header: 'relative', // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content pageConfig={pageConfig} />
        </Layout>
    );
};

export default withApollo({ ssr: true })(withTranslation()(Page));
