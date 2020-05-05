import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCustomer = (token) => useQuery(Schema.getCustomer, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    skip: token === '' || !token,
    fetchPolicy: 'no-cache',
});

export default {
    getCustomer,
};
