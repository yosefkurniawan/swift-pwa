import { gql } from 'apollo-boost';

export const getCustomer = gql`
{
    customer {
     firstname
     lastname
     email
      
    }
  }
`;

export default {
    getCustomer,
};
