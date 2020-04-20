import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCountries = () => useQuery(Schema.getCountries);

export default { getCountries };
