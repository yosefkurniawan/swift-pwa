import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCategory = (variables) => useQuery(Schema.getCategory(variables));

export default { getCategory };
