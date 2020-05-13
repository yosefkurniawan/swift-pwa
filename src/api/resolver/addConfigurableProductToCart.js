/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
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

async function addConfigurableProductsToCart(parent, args, context) {
    const {
        cart_id, cart_items: { parent_sku, data: { sku, quantity } },
    } = args.input;
    const res = await requestGraph(query, {
        cartId: cart_id, qty: quantity, sku, parentSku: parent_sku,
    }, context);
    if (res.addConfigurableProductsToCart) {
        return res.addConfigurableProductsToCart;
    }
    return {
        message: 'Error',
    };
}

module.exports = addConfigurableProductsToCart;
