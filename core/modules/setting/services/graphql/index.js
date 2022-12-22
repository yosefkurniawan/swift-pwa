/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import schema from '@core_modules/setting/services/graphql/schema';

export const getCurrency = () => useQuery(schema.getCurrencySchema, {
    skip: typeof window === 'undefined',
});
export const getStoreName = () => useQuery(schema.getStoreName, {
    skip: typeof window === 'undefined',
});

export default {
    getCurrency,
    getStoreName,
};
