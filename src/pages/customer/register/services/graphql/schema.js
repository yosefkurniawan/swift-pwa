import { gql } from 'apollo-boost';

export const register = gql`
    mutation register(
        $firstName: String!,
        $lastName: String,
        $email: String!,
        $password: String!,
        $phoneNumber: String!,
        $subscribe: Boolean,
        $otp: String!,
    ) {
      internalCreateCustomerToken(
        input: {
          firstname: $firstName,
          lastname: $lastName,
          email: $email,
          password: $password,
          phonenumber: $phoneNumber,
          is_subscribed: $subscribe,
          otp: $otp,
        }
      ) {
        token
      }
    }
`;

export default {
    register,
};
