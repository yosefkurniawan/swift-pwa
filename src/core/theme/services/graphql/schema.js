/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const categories = gql`
    {
        categoryList {
            children_count
            children {
                id
                level
                name
                path
                url_path
                url_key
                include_in_menu
                children {
                    id
                    level
                    name
                    path
                    url_path
                    url_key
                    children {
                        id
                        level
                        name
                        path
                        url_path
                        url_key
                    }
                }
            }
        }
    }
`;

export const getCmsBlocks = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getCustomer = gql`
    {
        customer {
        id
        firstname
        lastname
        email
        }
        wishlist {
        items {
            id
        }
        }
    }
`;

export const removeToken = gql`
mutation {
  internalDeleteCustomerToken{
    result
  }
}
`;

export default {
    categories,
    getCustomer,
    removeToken,
    getCmsBlocks,
};
