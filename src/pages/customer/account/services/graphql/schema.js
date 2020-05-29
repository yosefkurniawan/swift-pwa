import { gql } from 'apollo-boost';

export const removeToken = gql`
mutation {
  internalDeleteCustomerToken{
    result
  }
}
`;

export default {
    removeToken,
};
