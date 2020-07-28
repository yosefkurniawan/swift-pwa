/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import { getBrandsData } from './shema';

export const getBrands = (variables) => useQuery(getBrandsData, {
    variables,
});
