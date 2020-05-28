/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        cart {
          id
          total_quantity
        }
      }
    }
`;

async function removeItemFromCart(parent, args, context) {
    const res = await requestGraph(query, { cartId: args.input.cart_id, cart_item_id: args.input.cart_item_id }, context);
    if (res.updateCartItems) {
        return res.updateCartItems;
    }
    return res;
}

module.exports = removeItemFromCart;
