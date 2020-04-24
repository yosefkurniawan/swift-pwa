import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';
import * as reviewSchema from './reviewSchema';

export const getProduct = (urlpath) => useQuery(Schema.getProduct(urlpath));
export const getConfigurableProduct = (sku) => useQuery(Schema.getConfigurableProduct(sku), {
    fetchPolicy: 'no-cache',
});


export const getReviews = (params) => useQuery(reviewSchema.getReview(params));
export const addReview = () => useMutation(reviewSchema.addReview);

export default { getProduct };
