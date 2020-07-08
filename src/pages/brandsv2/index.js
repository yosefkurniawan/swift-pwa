import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Brand from '../../modules/brands/base';
// import Content from '../../modules/brands/components/index';
import Content from './template';
import Skeleton from '../../modules/brands/components/skeleton';

const BrandsPage = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('brands:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('brands:title'),
        headerBackIcon: 'arrow', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'brands',
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Brand {...props} Content={Content} Skeleton={Skeleton} />
        </Layout>
    );
};

BrandsPage.getInitialProps = async () => ({
    namespacesRequired: ['brands'],
});

export default withApollo({ ssr: true })(withTranslation()(BrandsPage));
