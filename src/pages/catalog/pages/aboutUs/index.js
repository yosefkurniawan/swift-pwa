import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './components';

const Page = (props) => {
    const pageConfig = {
        title: 'About us',
        headerTitle: 'About us',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
