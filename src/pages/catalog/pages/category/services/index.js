import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCategory = (variables) => useQuery(Schema.getCategory(variables));
export const getProductByCategory = (catId, config) => useQuery(Schema.getProductByCategory(catId, config));
export const getFilter = (catId) => useQuery(Schema.getFilter(catId));

export default { getCategory };
