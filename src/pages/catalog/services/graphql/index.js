import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getResolver = (urlpath) => useQuery(Schema.getResolver(urlpath));

export default { getResolver };
