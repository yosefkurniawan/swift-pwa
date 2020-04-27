import { gql } from 'apollo-boost';

export const getCustomerToken = gql`
mutation getToken(
    $email: String!,
    $password: String!,
) {
    generateCustomerToken(email: $email, password: $password){
      token
    }
  }
`;


export default {
    getCustomerToken,
};
