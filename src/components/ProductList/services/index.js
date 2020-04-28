import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getProduct = (config) => useQuery(Schema.getProduct(config));

export default { getProduct };
