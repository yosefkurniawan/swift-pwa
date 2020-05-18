import { useMutation } from '@apollo/react-hooks';
import helper from '@helpers/token';
import * as Schema from './schema';

const config = {
    context: {
        headers: {
            authorization: `Bearer ${helper.getToken()}`,
        },
        request: 'internal',
    },
};

export const updatedDefaultAddress = (options = {}) => useMutation(Schema.updatedDefaultAddress, {
    ...options,
    ...config,
});

export const updateCustomerAddress = (options = {}) => useMutation(Schema.updateCustomerAddress, {
    ...options,
    ...config,
});

export const createCustomerAddress = (options = {}) => useMutation(Schema.createCustomerAddress, {
    ...options,
    ...config,
});

export default { updatedDefaultAddress, updateCustomerAddress, createCustomerAddress };
