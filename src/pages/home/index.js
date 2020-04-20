import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import { withRedux } from '@lib/redux';
import { compose } from 'redux';
import ConfigSchema from '@services/graphql/schema/config';
import { setStoreConfig } from '@stores/actions/config';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('home:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async (props) => {
    const { apolloClient, reduxStore } = props;
    const { getState, dispatch } = reduxStore;
    const state = getState();
    if (state.config.storeConfig === '' || !state.config.storeConfig) {
        const query = await apolloClient.query({ query: ConfigSchema }).then(({ data: { storeConfig } }) => storeConfig);
        dispatch(setStoreConfig(query));
    }
    return { namespacesRequired: ['common', 'home'] };
};

export default compose(withApollo({ ssr: true }), withRedux)(withTranslation()(Page));
