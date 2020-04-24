import { gql } from 'apollo-boost';

export const createCartIdGuest = gql`
    mutation {
        createEmptyCart
    }
`;

export const createCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const getCountCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
        }
    }
`;

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

export default {
    createCartIdGuest,
    createCartIdUser,
    // guestGetCart,
};
