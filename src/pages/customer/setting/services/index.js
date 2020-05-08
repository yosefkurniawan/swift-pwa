/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCustomer = (token) => useQuery(Schema.getCustomer, {
    context: {
        headers: token && token !== '' ? {
            Authorization: `Bearer ${token}`,
        } : {},
    },
});
