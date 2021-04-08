import { gql } from '@apollo/client';

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

export const addDownloadableProductsToCart = gql`
mutation(
  $cartId : String!,
  $sku: String!,
  $qty: Float!,
  $download_product_link: [DownloadableProductLinksInput]
) {
  addDownloadableProductsToCart(
    input: {
      cart_id: $cartId
      cart_items: {
        data: {
          sku: $sku
          quantity: $qty
        }
        downloadable_product_links: $download_product_link
      }
    }
  ) {
    cart {
      total_quantity
      items {
        product {
          sku
        }
        quantity
        ... on DownloadableCartItem {
          links {
            title
            price
          }
          samples {
            title
            sample_url
          }
        }
      }
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

export const addBundleProductsToCart = gql`
mutation (
  $cartId: String!,
  $cartItems: [BundleProductCartItemInput]!
) {
      addBundleProductsToCart(
        input: {
          cart_id: $cartId
          cart_items: $cartItems
        }
      ) {
        cart {
          id
          total_quantity
        }
      }
    }
`;

export const addProductToCart = gql`
    mutation addProductToCart(
        $cartId: String!,
        $cartItems: [CartItemInput!]!
    ) {
        addProductsToCart(
            cartId: $cartId
            cartItems: $cartItems
        ) {
            cart {
                id
                total_quantity
            }
            user_errors {
                code
                message
            }
        }
    }
`;

export default {
    createCartIdGuest,
};
