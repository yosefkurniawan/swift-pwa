import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as schemaCategory from './categorySchema';
import * as productSchema from './productSchema';

export const getProduct = (config, otherConfig = {}) => useQuery(productSchema.getProduct(config), otherConfig);
export const getProductAgragations = () => useQuery(productSchema.getProductAgragations());
export const getCategory = (variables) => useQuery(schemaCategory.getCategory(variables));
export const getCategoryProducts = (variables) => useQuery(schemaCategory.getCategoryProducts(variables));
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
