import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as schemaCategory from './categorySchema';
import * as productSchema from './productSchema';

export const getProduct = (config, otherConfig = {}) => useQuery(productSchema.getProduct(config), {
    ...otherConfig,
    fetchPolicy: 'cache-and-network',
});
export const getProductAgragations = () => useQuery(productSchema.getProductAgragations(), {
    fetchPolicy: 'cache-and-network',
});
export const getCategory = (variables) => useQuery(schemaCategory.getCategory(variables), {
    fetchPolicy: 'cache-and-network',
});
export const getCategoryProducts = (variables) => useQuery(schemaCategory.getCategoryProducts(variables), {
    fetchPolicy: 'cache-and-network',
});
export const getFilter = (catId) => useQuery(schemaCategory.getFilter(catId), { ssr: true });
export const addWishlist = () => useMutation(productSchema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const getDetailProduct = () => useLazyQuery(productSchema.getDetailProduct, {
    fetchPolicy: 'no-cache',
});

export default { getCategory, getCategoryProducts };
