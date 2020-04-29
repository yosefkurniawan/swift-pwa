/* eslint-disable import/prefer-default-export */

import { gql } from 'apollo-boost';

export const getCountries = gql`
  {
    countries {
      id
      full_name_locale
      full_name_english
      available_regions {
        id
        code
        name
      }
    }
  }
`;

export const getCityByRegionId = gql`
  query Cities($regionId: Int!){
    getCityByRegionId(region_id: $regionId){
      item {
        id
        city
      }
    }
  }
`

export const updatedDefaultAddress = gql`
  mutation updatedDefaultAddress($addressId: Int!){
    updateCustomerAddress(
      id: $addressId
      input: { default_billing: true, default_shipping: true }
    ) {
      id
      city
      default_billing
      default_shipping
    }
  }
`;

export const updateCustomerAddress = gql`
  mutation updateCustomerAddress(
      $city: String!
      $countryCode: CountryCodeEnum!
      $defaultBilling: Boolean!
      $defaultShipping: Boolean!
      $firstname: String!
      $lastname: String!
      $telephone: String!
      $postcode: String!
      $street: String!
      $addressId: Int!
      $region: String!
      $regionCode: String
      $regionId: Int
    ) {
    updateCustomerAddress(
      id: $addressId
      input: {
        city: $city
        country_code: $countryCode
        country_id: $countryCode
        default_billing: $defaultBilling
        default_shipping: $defaultShipping
        firstname: $firstname
        lastname: $lastname
        postcode: $postcode
        street: [$street]
        telephone: $telephone
        region: {
          region: $region
          region_code: $regionCode
          region_id: $regionId
        }
      }
    ) {
      id
      city
      default_billing
      default_shipping
    }
  }
`;