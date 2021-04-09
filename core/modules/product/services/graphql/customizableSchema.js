/* eslint-disable no-plusplus */
import { gql } from '@apollo/client';

export const getCustomizableCheckboxOption = (url_key = '') => gql`
{
    products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
          items {
            ... on CustomizableProductInterface {
              options {
                    option_id
                 ... on CustomizableCheckboxOption {
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
                    }
              }
            }
          }
      }
  }
`;

export default getCustomizableCheckboxOption;
