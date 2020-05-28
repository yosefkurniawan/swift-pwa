const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = `
    mutation($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId }) {
            cart {
                ${cartOutput}
            }
        }
    }
`;

async function removeCouponFromCart(parent, variables, context) {
    const { cart_id } = variables.input;

    const vars = {
        cartId: cart_id,
    };

    const res = await requestGraph(query, vars, context);
    if (res.removeCouponFromCart) {
        return res.removeCouponFromCart;
    }
    return res;
}

module.exports = removeCouponFromCart;
