import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';
import * as reviewSchema from './reviewSchema';
import * as cartSchema from './cartSchema';

export const getProduct = (urlpath) => useQuery(Schema.getProduct(urlpath));
export const getConfigurableProduct = (sku) => useQuery(Schema.getConfigurableProduct(sku));

export const getReviews = (params) => useQuery(reviewSchema.getReview(), {
    variables: {
        ...params,
    },
});
export const addReview = () => useMutation(reviewSchema.addReview);

export const addSimpleProductsToCart = () => useMutation(cartSchema.addSimpleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addVirtualProductToCart = () => useMutation(cartSchema.addVirtualProductToCart, {
    context: {
        request: 'internal',
    },
});

export const addConfigProductsToCart = () => useMutation(cartSchema.addConfigProductsToCart, {
    context: {
        request: 'internal',
    },
});

export default { getProduct };
