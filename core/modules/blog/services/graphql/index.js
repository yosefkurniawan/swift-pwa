import { useQuery, useLazyQuery } from '@apollo/client';
import * as schema from '@core_modules/blog/services/graphql/schema';

const USING_INTERNAL = true;
const config = (isUsingInternal) => {
    const context = isUsingInternal ? { request: 'internal' } : {};

    return {
        notifyOnNetworkStatusChange: true,
        context,
    };
};

export const getBlog = (params = {}) => useQuery(schema.getAllPost, {
    ...params,
});

export const getCategory = (variables) => useQuery(schema.getCategory, {
    variables,
    skip: typeof window === 'undefined',
});

export const getDetailBlog = (id) => useQuery(schema.getPostById, {
    variables: {
        id,
    },
    skip: typeof window === 'undefined',
});

export const awBlogPostWithRelatedPosts = (options = {}) => useLazyQuery(schema.awBlogPostWithRelatedPosts, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});
export default {};
