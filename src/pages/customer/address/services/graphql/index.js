import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';
import helper from '@helpers/token';

const config = {
    context: {
        headers: {
            authorization: `Bearer ${helper.getToken()}`,
        },
    },
};

export const updatedDefaultAddress = (options = {}) =>
    useMutation(Schema.updatedDefaultAddress, {
        ...options,
        ...config,
    });

export const updateCustomerAddress = (options = {}) =>
    useMutation(Schema.updateCustomerAddress, {
        ...options,
        ...config,
    });

export const createCustomerAddress = (options = {}) =>
    useMutation(Schema.createCustomerAddress, {
        ...options,
        ...config,
    });

export default { updatedDefaultAddress, updateCustomerAddress, createCustomerAddress };
