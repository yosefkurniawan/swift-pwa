import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCountries = () => useQuery(Schema.getCountries);

export const updateCustomerAddress = (options = null, token) =>
    useMutation(Schema.updateCustomerAddress, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });

export default { getCountries, updateCustomerAddress };
