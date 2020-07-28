import Layout from '@layout';
import { withTranslation } from '@i18n';
import Loading from '@components/Loaders/Backdrop';
import Alert from '@material-ui/lab/Alert';
import Content from './components';
import { getCmsPage } from './services/graphql';

const Page = (props) => {
    const { url_key, t } = props;
    const { error, loading, data } = getCmsPage({ identifier: url_key });
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }
    if (loading) return <Loading open={loading} />;

    const pageConfig = {
        title: data.cmsPage.title,
        headerTitle: data.cmsPage.title,
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout {...props} pageConfig={pageConfig}>
            <Content {...props} content={data.cmsPage.content} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withTranslation()(Page);
