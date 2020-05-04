/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';


export const getCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
            applied_coupons {
                code
            }
            prices {
                discounts {
                    amount {
                        currency
                        value
                    }
                    label
                }
                grand_total {
                    currency
                    value
                }
            }
            items {
                product {
                    id
                    name
                    thumbnail {
                        url
                    }
                    url_key
                    sku
                }
                quantity
            }
        }
    }
`;
