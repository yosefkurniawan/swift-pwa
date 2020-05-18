import { useMutation } from '@apollo/react-hooks';
import Schema from './schema';

export const updateCustomer = (options = {}) => useMutation(Schema.updateCustomer, {
    ...options,
    context: { request: 'internal' },
});


export const changeCustomerPassword = (options = {}) => useMutation(Schema.changeCustomerPassword, {
    ...options,
    context: { request: 'internal' },
});

export default { updateCustomer, changeCustomerPassword };
