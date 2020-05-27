import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';


export const getStoreCredit = () => useQuery(Schema.getStoreCredit, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});


export default { getStoreCredit };
