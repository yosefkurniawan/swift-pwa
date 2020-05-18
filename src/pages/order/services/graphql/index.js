import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getOrder = (params, token) => useQuery(Schema.getOrder(), {
    context: {
        request: 'internal',
        headers: {
            Authorization: typeof window === 'undefined' ? `Bearer ${token}` : '',
        },
    },
    variables: params,
    fetchPolicy: 'cache-and-network',
});

export default {
    getOrder,
};
