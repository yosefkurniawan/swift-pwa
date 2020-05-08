/* eslint-disable import/prefer-default-export */
import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const updateCustomer = (token, variables) => useMutation(Schema.updateCustomer, {
    variables,
    context: {
        headers: token && token !== '' ? {
            Authorization: `Bearer ${token}`,
        } : {},
    },
});
