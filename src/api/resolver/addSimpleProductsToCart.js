/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
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

async function addSimpleProductsToCart(parent, args, context) {
    const { cart_id, cart_items: { data: { quantity, sku } } } = args.input;
    const res = await requestGraph(query, { cartId: cart_id, qty: quantity, sku }, context);
    if (res.addSimpleProductsToCart) {
        return res.addSimpleProductsToCart;
    }
    return {
        message: 'Error',
    };
}

module.exports = addSimpleProductsToCart;
