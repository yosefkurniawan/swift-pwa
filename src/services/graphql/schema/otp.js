import { gql } from 'apollo-boost';

export const requestOtpRegister = gql`
mutation requestOtp(
    $phoneNumber: String!
) {
    requestOtpRegister(phonenumber: $phoneNumber) {
        info
      }
}
`;

export const checkOtpRegister = gql`
mutation checkOtp(
    $phoneNumber: String!,
    $otp: String!,
) {
    checkOtpRegister(phonenumber: $phoneNumber, otp: $otp) {
        is_valid_otp
      }
}
`;
