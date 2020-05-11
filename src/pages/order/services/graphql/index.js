import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getOrder = (token, params) => useQuery(Schema.getOrder(params), {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    skip: token === '' || !token,
});

export default {
    getOrder,
};
