/* eslint-disable no-plusplus */
import { gql } from '@apollo/client';

const valueOption = `
    option_id
    required
    sort_order
    title
    value {
      option_type_id
      price
      price_type
      sku
      sort_order
      title
      uid
    }
`;

export const getCustomizableCheckboxOption = (url_key = '') => gql`
{
    products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
          items {
            ... on CustomizableProductInterface {
              options {
                    option_id
                 ... on CustomizableCheckboxOption {
                      ${valueOption}
                    }
              }
            }
          }
      }
  }
`;

export const getCustomizableRadioOption = (url_key = '') => gql`
{
  products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
        items {
          ... on CustomizableProductInterface {
            options {
                  option_id
               ... on CustomizableRadioOption {
                    ${valueOption}
                }
            }
          }
        }
    }
}
`;

export const getCustomizableDropDownOption = (url_key = '') => gql`
{
  products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
        items {
          ... on CustomizableProductInterface {
            options {
                  option_id
              __typename
              required
               ... on CustomizableDropDownOption {
                    ${valueOption}
                  }
            }
          }
        }
    }
}
`;

export default {
    getCustomizableCheckboxOption,
};
