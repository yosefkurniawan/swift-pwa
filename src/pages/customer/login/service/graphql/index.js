import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getToken = () => useMutation(Schema.getCustomerToken);

export default {
    getToken,
};
