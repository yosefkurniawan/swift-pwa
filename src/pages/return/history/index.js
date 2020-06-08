import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Component from './components';

const Page = (props) => {
    const pageConfig = {
        title: 'My Reeturn',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'My Return',
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Component {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'search', 'product'],
});

export default withTranslation()(Page);
