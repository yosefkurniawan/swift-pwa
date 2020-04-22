/* eslint-disable import/prefer-default-export */

import { gql } from 'apollo-boost';

/**
 * scema dynamic category
 * @param variables Object {id: number, productSize: Number}
 * @returns grapql query
 */

export const getCategory = (variables = {
    productSize: 20,
}) => {
    const query = gql`
    {
        categoryList(filters: { ids: { eq: "${variables.id}" } }) {
            id
            name
            description
            meta_description
            image
            products(pageSize: ${variables.productSize}) {
            total_count
            items {
                name
                image {
                url
                label
                }
                price_range {
                maximum_price {
                    discount {
                    amount_off
                    percent_off
                    }
                    final_price {
                    currency
                    value
                    }
                }
                }
            }
            }
            children {
            id
            name
            products (pageSize: ${variables.productSize}) {
                total_count
                items {
                name
                image {
                    url
                    label
                }
                price_range {
                    maximum_price {
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    }
                }
                }
            }
            }
        }
        }
    `;
    return query;
};
