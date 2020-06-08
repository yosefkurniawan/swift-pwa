import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCategory = (variables) => useQuery(Schema.getCategory(variables));
export const getFilter = (catId) => useQuery(Schema.getFilter(catId), { ssr: true });

export default { getCategory };
