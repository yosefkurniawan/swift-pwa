import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCategory = (variables) => useQuery(Schema.getCategory(variables));
// ssr not run if using cache
export const getProductByCategory = (catId, config) => useQuery(Schema.getProductByCategory(catId, config));
export const getFilter = (catId) => useQuery(Schema.getFilter(catId), { ssr: true });

export default { getCategory };
