/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getCurrency = () => useQuery(Schema.getCurrencySchema);

export const getStores = () => useQuery(Schema.getStores);

export default {
    getCurrency,
};
