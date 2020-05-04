import { useMutation } from '@apollo/react-hooks';
import * as Schema from '../schema/otp';

export const requestOtpRegister = () => useMutation(Schema.requestOtpRegister);
export const checkOtpRegister = () => useMutation(Schema.checkOtpRegister);
