import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getProduct = (urlpath) => useQuery(Schema.getProduct(urlpath));
export const getConfigurableProduct = (sku) => useQuery(Schema.getConfigurableProduct(sku));

export const getReviews = (params) => useQuery(Schema.getReview(), {
    variables: {
        ...params,
    },
});
export const addReview = () => useMutation(Schema.addReview);

export const addSimpleProductsToCart = () => useMutation(Schema.addSimpleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addVirtualProductToCart = () => useMutation(Schema.addVirtualProductToCart, {
    context: {
        request: 'internal',
    },
});

export const addConfigProductsToCart = () => useMutation(Schema.addConfigProductsToCart, {
    context: {
        request: 'internal',
    },
});

export default { getProduct };
