import { gql } from 'apollo-boost';

/**
 * scema dynamic category
 * @param variables Object {id: number, productSize: Number}
 * @returns grapql query
 */

export const getCategory = (
    variables = {
        productSize: 20,
    },
) => gql`
    {
        categoryList(filters: { ids: { eq: "${variables.id}" } }) {
          id
          name
          description
          url_path
          image
          image_path
          children {
            id
            name
            image
            url_path
          }
        }
    }
    `;

/**
 * scema dynamic get attribute filter
 * @param category_id number
 * @returns grapql query
 */

export const getFilter = (catID) => gql`
    {
        getFilterAttributeOptions (catid:${catID}) {
            code
            data {
                field
                id
                label
                maxprice
                minprice
                value {
                    label
                    value
                }
            }
            message
            status
        }
    }
`;
