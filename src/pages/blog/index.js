import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import Content from './components';
import DetailContent from './components/DetailBlog';
import { getBlog } from './services/graphql';
import Loader from './components/LoaderDetail';

const Page = (props) => {
    const router = useRouter();
    const { id } = router.query;
    let pageConfig = {
        title: 'Blog',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Blog',
        bottomNav: false,
    };
    if (id) {
        const { loading, data, error } = getBlog({
            page_size: 1,
            current_page: 1,
            category_id: 0,
            url_key: id,
        });
        if (loading && !data) return <Loader />;
        if (error) {
            return (
                <Layout pageConfig={pageConfig} {...props}>
                    <Alert className="m-15" severity="error">
                        {error.message.split(':')[1]}
                    </Alert>
                </Layout>
            );
        }
        if (data && data.getBlogByFilter.items.length > 0) {
            const blog = data.getBlogByFilter.items[0];
            pageConfig = {
                title: blog.title,
                header: 'relative', // available values: "absolute", "relative", false (default)
                headerTitle: blog.title,
                bottomNav: false,
            };
            return (
                <Layout pageConfig={pageConfig} {...props}>
                    <DetailContent {...props} {...blog} short={false} />
                </Layout>
            );
        } return <Error statusCode={404} />;
    }

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
