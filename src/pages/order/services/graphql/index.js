import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getOrder = (params) => useQuery(Schema.getOrder(), {
    context: {
        request: 'internal',
    },
    variables: params,
    fetchPolicy: 'cache-and-network',
});

export default {
    getOrder,
};
