import Layout from '@layout';
import { withTranslation } from '@i18n';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import { debuging } from '@config';
import Content from './components';
import { getCategory } from './services/graphql';
import Loader from './components/LoaderDetail';

const Page = (props) => {
    const router = useRouter();
    const { t } = props;
    const { id } = router.query;
    let pageConfig = {
        title: 'Blog Category',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Blog Category',
        bottomNav: false,
    };
    const { loading, data, error } = getCategory({
        url_key: id,
    });
    if (loading && !data) return <Loader />;
    if (error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <Alert className="m-15" severity="error">
                    {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                </Alert>
            </Layout>
        );
    }
    if (data && data.getBlogCategory.data.length > 0) {
        const category = data.getBlogCategory.data[0];
        pageConfig = {
            title: category.name,
            header: 'relative', // available values: "absolute", "relative", false (default)
            headerTitle: category.name,
            bottomNav: false,
        };
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <Content {...props} category={category} />
            </Layout>
        );
    } return <Error statusCode={404} />;
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withTranslation()(Page);
