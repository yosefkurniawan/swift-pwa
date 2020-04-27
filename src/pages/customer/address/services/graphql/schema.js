/* eslint-disable import/prefer-default-export */

import { gql } from 'apollo-boost';

export const getCountries = gql`
  {
    countries {
      id
      full_name_locale
      full_name_english
    }
  }
`;

export const updateCustomerAddress = gql`
    mutation updateCustomerAddress($addressId: Int!){
        updateCustomerAddress(
            id: $addressId
            input: { default_billing: true, default_shipping: true }
        ) {
            id
            default_billing
            default_shipping
        }
    }
`;