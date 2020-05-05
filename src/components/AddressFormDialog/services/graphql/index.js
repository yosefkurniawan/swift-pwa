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

export const getCityByRegionId = (options = {}) => useLazyQuery(Schema.getCityByRegionId, { ...options, fetchPolicy: 'network-only' });

export default { getCountries, getCityByRegionId };
