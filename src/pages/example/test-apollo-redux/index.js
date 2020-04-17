import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import { withRedux } from '@lib/redux';
import { compose } from 'redux';
import Content from './components';
import { exampleAction } from './redux/actions';

const Page = () => {
    const pageConfig = {
        title: 'Test Apollo with Redux',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Test Apollo with Redux',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content pageConfig={pageConfig} />
        </Layout>
    );
};

Page.getInitialProps = async ({ reduxStore }) => {
    const { dispatch } = reduxStore;
    dispatch(exampleAction('hello world!'));

    return {
        namespacesRequired: ['common', 'example'],
    };
};

export default compose(withApollo({ ssr: true }), withRedux)(withTranslation()(Page));
