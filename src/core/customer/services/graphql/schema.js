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
  query Cities($regionId: Int!) {
    getCityByRegionId(region_id: $regionId) {
      item {
        id
        city
        postcode
      }
    }
  }
`;

// schema settingsPage

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

export const getCustomerSettings = gql`
{
    customer {
     firstname
     lastname
     email
     is_subscribed
    }
  }
`;
