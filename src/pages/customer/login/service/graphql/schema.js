import { gql } from 'apollo-boost';

export const getCustomerToken = gql`
mutation getToken(
    $username: String!,
    $password: String!,
) {
  internalCreateCustomerToken(username: $username, password: $password){
      token
    }
  }
`;

export const getCustomerTokenOtp = gql`
mutation getToken(
    $username: String!,
    $otp: String!,
) {
  internalCreateCustomerTokenOtp(username: $username, otp: $otp){
      originalToken
      token
      message
    }
  }
`;


export default {
    getCustomerToken,
    getCustomerTokenOtp,
};
