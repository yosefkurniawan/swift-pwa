import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import * as Schema from './schema';
import helper from '@helpers/token';

const config = {
    context: {
        headers: {
            authorization: `Bearer ${helper.getToken()}`,
        },
    },
};

export const getCountries = () => useLazyQuery(Schema.getCountries);

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

export const getCityByRegionId = (options = {}) => useLazyQuery(Schema.getCityByRegionId, { ...options, fetchPolicy: 'network-only' });

export default { getCountries, updatedDefaultAddress, updateCustomerAddress, getCityByRegionId, createCustomerAddress };
