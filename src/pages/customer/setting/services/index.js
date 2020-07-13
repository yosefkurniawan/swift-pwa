/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCustomer = () => useQuery(Schema.getCustomer, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
});
