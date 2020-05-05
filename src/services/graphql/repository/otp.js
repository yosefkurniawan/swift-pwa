import { useMutation } from '@apollo/react-hooks';
import * as Schema from '../schema/otp';

export const requestOtpRegister = () => useMutation(Schema.requestOtpRegister);
export const checkOtpRegister = () => useMutation(Schema.checkOtpRegister);
export const requestOtpForgotPassword = () => useMutation(Schema.requestOtpForgotPassword);
export const checkOtpForgotPassword = () => useMutation(Schema.checkOtpForgotPassword);
