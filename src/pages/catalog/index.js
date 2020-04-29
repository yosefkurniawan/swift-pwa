import { withApollo } from '@lib/apollo';
import { compose } from 'redux';
import Content from './component';

const CatalogPage = (props) => (
    <Content {...props} />
);

/**
 * get slug from query
 * namespacesRequired empty because Catalog page using product and category so only on component
*/
CatalogPage.getInitialProps = async ({ query, req }) => ({
    slug: query.slug,
    namespacesRequired: ['common', 'product', 'category', 'validate'],
    url: req
        ? `${req.protocol}://${req.get('host')}`
        : `${window.location.protocol
        }//${
            window.location.hostname
        }${window.location.port ? `:${window.location.port}` : ''}`,
});


export default compose(withApollo({ ssr: true }))(CatalogPage);
