import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';
import * as reviewSchema from './reviewSchema';
import * as cartSchema from './cartSchema';

export const getProduct = (urlpath) => useQuery(Schema.getProduct(urlpath));
export const getConfigurableProduct = (sku) => useQuery(Schema.getConfigurableProduct(sku));


export const getReviews = (params) => useQuery(reviewSchema.getReview(params));
export const addReview = () => useMutation(reviewSchema.addReview);

export const addSimpleProductsToCart = (token) => useMutation(cartSchema.addSimpleProductsToCart, {
    context: {
        headers: token && token !== '' ? {
            Authorization: `Bearer ${token}`,
        } : {},
    },
});

export default { getProduct };
