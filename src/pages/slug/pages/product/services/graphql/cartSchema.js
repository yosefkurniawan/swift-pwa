import { gql } from 'apollo-boost';

export const createEmptyCartGuest = gql`
    mutation {
        createEmptyCart
    }
`;

export const addSimpleProductsToCart = gql`
mutation addSimpleProductsToCart(
    $cartId: String!,
    $qty: Float!,
    $sku: String!,
) {
    addSimpleProductsToCart(input:{
      cart_id: $cartId,
      cart_items: {
        data: {
          quantity: $qty,
          sku: $sku
        }
      }
    }) {
      cart {
        id
        total_quantity
      }
    }
  }
`;

export const addVirtualProductToCart = gql`
mutation addVirtualProductToCart(
    $cartId: String!,
    $qty: Float!,
    $sku: String!,
) {
    addVirtualProductsToCart(input:{
      cart_id: $cartId,
      cart_items: {
        data: {
          quantity: $qty,
          sku: $sku
        }
      }
    }) {
      cart {
        id
        total_quantity
      }
    }
  }
`;

export const addConfigProductsToCart = gql`
mutation (
  $cartId: String!,
  $qty: Float!,
  $sku: String!,
  $parentSku: String!,
) {
  addConfigurableProductsToCart(
    input: {
      cart_id: $cartId,
      cart_items: {
        data: {
          quantity : $qty,
          sku: $sku
        }
        parent_sku: $parentSku
      }
    }
  ) {
    cart {
      id
      total_quantity
    }
  }
}
`;

export default {
    createEmptyCartGuest,
    addSimpleProductsToCart,
};
