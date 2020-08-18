import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, { variables });

export default { getCmsPage };
