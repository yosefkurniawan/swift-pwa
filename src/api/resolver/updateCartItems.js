/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
    mutation updateCartItems($cartId: String!, $cart_item_id: Int!, $quantity: Float!) {
      updateCartItems(
        input: { 
          cart_id: $cartId,
          cart_items: {cart_item_id: $cart_item_id, quantity: $quantity }
        }
      ) {
        cart {
          id
          total_quantity
        }
      }
    }
`;

async function updateCartItems(parent, args, context) {
    const res = await requestGraph(query, {
        cartId: args.input.cart_id,
        cart_item_id: args.input.cart_items.cart_item_id,
        quantity: args.input.cart_items.quantity,
    }, context);
    if (res.updateCartItems) {
        return res.updateCartItems;
    }
    return res;
}

module.exports = updateCartItems;
