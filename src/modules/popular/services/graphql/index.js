/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/extensions
import { useQuery } from '@apollo/client';
import productQuery from './shema';

const getProduct = () => useQuery(productQuery);

export default { getProduct };
