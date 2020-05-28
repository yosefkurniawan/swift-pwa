import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getToken = () => useMutation(Schema.getCustomerToken, {
    context: {
        request: 'internal',
    },
});

export const getTokenOtp = () => useMutation(Schema.getCustomerTokenOtp, {
    context: {
        request: 'internal',
    },
});

export default {
    getToken,
    getTokenOtp,
};
