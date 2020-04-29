import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getResolver = (urlpath) => useQuery(Schema.getResolver(urlpath));

export const getStoreConfig = () => useQuery(Schema.getStoreConfig);

export default { getResolver, getStoreConfig };
