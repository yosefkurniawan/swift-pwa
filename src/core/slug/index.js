import { withApollo } from '@lib/apollo';
import CategoryPage from '@core/catalog/pages/category';
import ProductPage from '@core/detail/pages/default';
import CmsPage from '@pages/slug/pages/cms';
import Core from './core';
import LoadingView from '../commons/Backdrop';

const Page = (props) => (
    <Core
        CategoryPage={CategoryPage}
        ProductPage={ProductPage}
        CmsPage={CmsPage}
        LoadingView={LoadingView}
        {...props}
    />
);

/**
 * get slug from query
 * namespacesRequired empty because Catalog page using product and category so only on component
*/
Page.getInitialProps = async ({ query, req }) => ({
    slug: query.slug,
    namespacesRequired: ['common', 'product', 'category', 'validate', 'wishlist', 'catalog'],
    url_key: req
        ? `${req.protocol}://${req.get('host')}`
        : `${window.location.protocol
        }//${
            window.location.hostname
        }${window.location.port ? `:${window.location.port}` : ''}`,
});

export default withApollo({ ssr: true })(Page);
