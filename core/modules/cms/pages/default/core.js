import Layout from '@layout';
import { getCmsPage } from '@core_modules/cms/services/graphql';
import Content from '@core_modules/cms/pages/default/components';

const CmsSlug = (props) => {
    const {
        pageConfig, t, slug, ...other
    } = props;
    const { data, error, loading } = getCmsPage({ identifier: slug[0] });
    const Config = {
        title: data && data.cmsPage ? data.cmsPage.title : '',
        headerTitle: data && data.cmsPage ? data.cmsPage.title : '',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };

    return (
        <Layout {...props} pageConfig={pageConfig || Config}>
            <Content data={data} t={t} loading={loading} error={error} {...other} />
        </Layout>
    );
};

export default CmsSlug;
