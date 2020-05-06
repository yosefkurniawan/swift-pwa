import { useLazyQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCountries = () => useLazyQuery(Schema.getCountries);

export const getCityByRegionId = (options = {}) => useLazyQuery(Schema.getCityByRegionId, { ...options, fetchPolicy: 'network-only' });

export default { getCountries, getCityByRegionId };
