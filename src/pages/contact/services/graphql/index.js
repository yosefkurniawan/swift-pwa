import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getContactPage = (variables) => useQuery(Schema.getContactPage, { variables });

export default { getContactPage };
