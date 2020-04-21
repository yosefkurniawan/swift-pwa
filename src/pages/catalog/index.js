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
CatalogPage.getInitialProps = async ({ query }) => ({
    slug: query.slug,
    namespacesRequired: [],
});


export default compose(withApollo({ ssr: true }))(CatalogPage);
