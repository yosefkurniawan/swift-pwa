import Layout from '@layout';
// import { getStoreLocations } from '../../services/graphql';

const PageStoreLocator = (props) => {
    const {
        t, Content, pageConfig,
    } = props;
    const config = {
        title: t('storelocator:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('storelocator:title'),
        bottomNav: false,
    };

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                loading={false}
            />
        </Layout>
    );
};

export default PageStoreLocator;
