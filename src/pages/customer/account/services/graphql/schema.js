import { gql } from 'apollo-boost';

export const removeToken = gql`
mutation {
  revokeCustomerToken{
    result
  }
}
`;

export default {
    removeToken,
};
