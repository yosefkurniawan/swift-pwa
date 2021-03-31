/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import schema from './schema';

export const getCurrency = () => useQuery(schema.getCurrencySchema);

export default {
    getCurrency,
};
