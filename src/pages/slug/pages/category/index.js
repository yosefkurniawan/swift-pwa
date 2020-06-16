import { withTranslation } from '@i18n';
import Layout from '@components/Layouts';
import PropTypes from 'prop-types';
import { StripHtmlTags } from '@helpers/text';
import Component from './components';
import { getCategory } from './services';
import SkeletonCategory from './components/Skeleton';
import generateSchemaOrg from './helpers/schema.org';

const Page = (props) => {
    const { categoryId, storeConfig } = props;
    const { loading, data } = getCategory({
        productSize: 20,
        id: categoryId,
    });
    const ogContent = {};
    let schemaOrg = null;
    if (data) {
        const category = data.categoryList[0];
        schemaOrg = generateSchemaOrg(category, storeConfig);
        if (data.categoryList[0].description) {
            ogContent.description = StripHtmlTags(data.categoryList[0].description);
        }
    }
    const pageConfig = {
        title: loading ? '' : data.categoryList[0].name,
        headerTitle: data && !data.categoryList[0].image_path ? data.categoryList[0].name : '',
        header: data && data.categoryList[0].image_path ? 'absolute' : 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: 'browse',
        pageType: 'category',
        ogContent,
        schemaOrg,
    };
    return (
        <Layout {...props} pageConfig={pageConfig}>
            {loading ? <SkeletonCategory /> : <Component {...props} data={data} />}
        </Layout>
    );
};

Page.propTypes = {
    categoryId: PropTypes.number.isRequired,
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'category'],
});

export default withTranslation()(Page);
