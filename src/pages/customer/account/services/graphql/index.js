import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCustomer = (token) => useQuery(Schema.getCustomer, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
});

export default {
    getCustomer,
};
