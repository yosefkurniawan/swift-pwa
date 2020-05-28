import { gql } from 'apollo-boost';

export const getCustomerToken = gql`
mutation getToken(
    $username: String!,
    $password: String!,
) {
  generateCustomerTokenCustom(username: $username, password: $password){
      originalToken
      token
      message
    }
  }
`;

export const getCustomerTokenOtp = gql`
mutation getToken(
    $username: String!,
    $otp: String!,
) {
  generateCustomerTokenCustomOtp(username: $username, otp: $otp){
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
