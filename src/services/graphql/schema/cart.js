import { gql } from 'apollo-boost';

export const mergeCart = gql`
mutation mergeCart(
    $sourceCartId: String!,
    $destionationCartId: String!
) {
    mergeCarts(
      source_cart_id:$sourceCartId,
      destination_cart_id: $destionationCartId
    ) {
      id
      total_quantity
    }
  }
`;

export const createCartIdGuest = gql`
    mutation {
        createEmptyCart
    }
`;

export const getCartIdUser = gql`
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
    getCartIdUser,
    // guestGetCart,
};
