/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

const productQuery = gql`
    query getProduct {
        products(search: "", sort: {
            relevance:ASC
          }) {
            total_count
            items{
              name
              image{
                url
              }
              url_key
            }
          }
    }
`;

export default productQuery;
