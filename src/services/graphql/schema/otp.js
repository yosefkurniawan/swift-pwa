import { gql } from 'apollo-boost';

export const requestOtpRegister = gql`
    mutation requestOtp($phoneNumber: String!) {
        requestOtpRegister(phonenumber: $phoneNumber) {
            info
        }
    }
`;

export const requestOtpForgotPassword = gql`
    mutation requestOtp($phoneNumber: String!) {
        requestOtpForgotPassword(phonenumber: $phoneNumber) {
            info
        }
    }
`;

export const checkOtpRegister = gql`
    mutation checkOtp($phoneNumber: String!, $otp: String!) {
        checkOtpRegister(phonenumber: $phoneNumber, otp: $otp) {
            is_valid_otp
        }
    }
`;

export const checkOtpForgotPassword = gql`
    mutation checkOtp($phoneNumber: String!, $otp: String!) {
        checkOtpForgotPassword(phonenumber: $phoneNumber, otp: $otp) {
            is_valid_otp
        }
    }
`;

export const requestOtpLogin = gql`
    mutation requestOtp($phoneNumber: String!) {
        requestOtpLogin(phonenumber: $phoneNumber) {
            info
        }
    }
`;

export const checkOtpLogin = gql`
mutation checkOtp(
    $phoneNumber: String!,
    $otp: String!,
) {
    checkOtpLogin(phonenumber: $phoneNumber, otp: $otp) {
        is_valid_otp
      }
}
`;
