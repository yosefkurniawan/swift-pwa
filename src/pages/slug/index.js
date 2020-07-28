import { withApollo } from '@lib/apollo';
import Content from './component';

const Page = (props) => (
    <Content {...props} />
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
