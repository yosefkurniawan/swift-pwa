import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Error from 'next/error';
import Content from './components';
import DetailContent from './components/DetailBlog';
import { getDetailBlog } from './services/graphql';

const Page = (props) => {
    const { slug } = props;
    if (slug && slug.length > 1) {
        const { loading, data, error } = getDetailBlog(slug[1]);
        if (loading && !data) return <p>Loading</p>;
        if (error) return <p>Error</p>;
        if (data && data.getBlogByFilter.data.length > 0) {
            const blog = data.getBlogByFilter.data[0];
            const pageConfig = {
                title: blog.title,
                header: 'relative', // available values: "absolute", "relative", false (default)
                headerTitle: blog.title,
                bottomNav: false,
            };
            return (
                <Layout pageConfig={pageConfig} {...props}>
                    <DetailContent {...props} {...blog} />
                </Layout>
            );
        } return <Error statusCode={404} />;
    }

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
