import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCountries = () => useLazyQuery(Schema.getCountries);

export const getCityByRegionId = (options = {}) => useLazyQuery(Schema.getCityByRegionId, { ...options, fetchPolicy: 'network-only' });

export const getCustomerSettings = () => useQuery(Schema.getCustomerSettings, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
});

export default { getCountries, getCityByRegionId };
