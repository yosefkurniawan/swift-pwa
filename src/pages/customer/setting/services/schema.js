/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const updateCustomer = gql`
    mutation updateCustomerSetting($isSubscribed: Boolean!) {
        updateCustomer(
            input: {
              is_subscribed: $isSubscribed
            }
          ) {
            customer {
                is_subscribed
            }
          }
    }
`;

export const getCustomer = gql`
{
    customer {
     firstname
     lastname
     email
     is_subscribed
    }
  }
`;
