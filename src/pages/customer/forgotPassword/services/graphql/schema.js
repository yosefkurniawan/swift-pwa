import { gql } from 'apollo-boost';

export const requestLinkToken = gql`
    mutation requestLinkToken($email: String!, $phoneNumber: String!, $otp: String!) {
        requestLinkForgotPassword(input: { email: $email, phonenumber: $phoneNumber, otp: $otp }) {
            token
            app_url
            url
        }
    }
`;


export default {
    requestLinkToken,
};
