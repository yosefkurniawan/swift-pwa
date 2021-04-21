import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';
import * as ActionSchema from './actionSchema';

const defaultConfig = {
    fetchPolicy: 'cache-and-network',
};

export const getProduct = (urlpath) => useQuery(Schema.getProduct(urlpath), {
    ...defaultConfig,
});
export const getProductBySku = (params) => useQuery(Schema.getProductBySku(), {
    ...params,
    ...defaultConfig,
});

export const getReviews = (params) => useQuery(Schema.getReview(), {
    variables: {
        ...params,
    },
});

export const addReview = () => useMutation(Schema.addReview, {
    context: {
        request: 'internal',
    },
});

export const addWishlist = () => useMutation(Schema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const getConfigurableProduct = (sku) => useQuery(Schema.getConfigurableProduct(sku), {
    ...defaultConfig,
});
export const getBundleProduct = (sku) => useQuery(Schema.getBundleProduct(sku), {
    ...defaultConfig,
});
export const getDownloadroduct = (sku) => useQuery(Schema.getDownloadProduct(sku), {
    ...defaultConfig,
});
export const getGroupedProduct = (sku) => useQuery(Schema.getGroupedProduct, {
    variables: { sku },
    skip: !sku,
    ...defaultConfig,
});

// actions add to cart

export const addSimpleProductsToCart = () => useMutation(ActionSchema.addSimpleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addVirtualProductToCart = () => useMutation(ActionSchema.addVirtualProductToCart, {
    context: {
        request: 'internal',
    },
});

export const addDownloadProductToCart = () => useMutation(ActionSchema.addDownloadableProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addConfigProductsToCart = () => useMutation(ActionSchema.addConfigProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const addBundleProductsToCart = () => useMutation(ActionSchema.addBundleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const getGuestCartId = () => useMutation(ActionSchema.createCartIdGuest);
export const getCustomerCartId = () => useLazyQuery(ActionSchema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export const addProductsToCart = () => useMutation(ActionSchema.addProductToCart, {
    context: {
        request: 'internal',
    },
});

export default { getProduct };
