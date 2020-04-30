import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Loading from '@components/Loaders';
import Content from './components';
import { getCmsPage } from './services/graphql';

const Page = (props) => {
    const { url } = props;
    const { error, loading, data } = getCmsPage({ identifier: url });
    if (error) return <p>error</p>;
    if (loading) return <Loading size="40px" />;

    const pageConfig = {
        title: data.cmsPage.title,
        headerTitle: data.cmsPage.title,
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} content={data.cmsPage.content} />
        </Layout>
    );
};

export default withTranslation()(Page);
