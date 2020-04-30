import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getContactPage = () => useQuery(Schema.getContactPage);

export default { getContactPage };
