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

export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const requestOtpRegister = () => useMutation(Schema.requestOtpRegister);
export const checkOtpRegister = () => useMutation(Schema.checkOtpRegister);
export const requestOtpLogin = () => useMutation(Schema.requestOtpLogin);
export const checkOtpLogin = () => useMutation(Schema.checkOtpLogin);
export const requestOtpForgotPassword = () => useMutation(Schema.requestOtpForgotPassword);
export const checkOtpForgotPassword = () => useMutation(Schema.checkOtpForgotPassword);

export default {
    getToken,
    getTokenOtp,
};
