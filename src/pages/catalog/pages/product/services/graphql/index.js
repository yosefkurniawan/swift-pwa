import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getProduct = (urlpath) => useQuery(Schema.getProduct(urlpath));
export const getReviews = (params) => useQuery(Schema.getReview(params));
export const getConfigurableProduct = (sku) => useQuery(Schema.getConfigurableProduct(sku), {
    fetchPolicy: 'no-cache',
});

export default { getProduct };
