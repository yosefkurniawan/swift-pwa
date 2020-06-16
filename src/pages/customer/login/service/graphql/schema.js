import { gql } from 'apollo-boost';

export const getCustomerToken = gql`
mutation getToken(
    $username: String!,
    $password: String!,
) {
  internalGenerateCustomerToken(username: $username, password: $password){
      token
    }
  }
`;

export const getCustomerTokenOtp = gql`
mutation getToken(
    $username: String!,
    $otp: String!,
) {
  internalGenerateCustomerTokenOtp(username: $username, otp: $otp){
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
