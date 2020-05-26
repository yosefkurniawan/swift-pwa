const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = `
    mutation($cartId: String!) {
        removeStoreCreditFromCart(input: { cart_id: $cartId }) {
            cart {
                ${cartOutput}
            }
        }
    }
`;

async function removeStoreCreditFromCart(parent, variables, context) {
    const { cart_id } = variables.input;
    const vars = {
        cartId: cart_id,
    };

    const res = await requestGraph(query, vars, context);
    if (res.removeStoreCreditFromCart) {
        return res.removeStoreCreditFromCart;
    }
    return res;
}

module.exports = removeStoreCreditFromCart;
