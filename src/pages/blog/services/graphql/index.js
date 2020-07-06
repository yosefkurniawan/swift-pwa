import { useQuery } from '@apollo/react-hooks';
import * as schema from './schema';

export const getBlog = (variables) => useQuery(schema.getAllPost, {
    variables,
});

export const getCategory = (variables) => useQuery(schema.getCategory, {
    variables,
});

export const getDetailBlog = (id) => useQuery(schema.getPostById, {
    variables: {
        id,
    },
});

export default {};
