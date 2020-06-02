import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getOrder = (params) => useQuery(Schema.getOrder(), {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    variables: params,
    fetchPolicy: 'cache-and-network',
});

export default {
    getOrder,
};
