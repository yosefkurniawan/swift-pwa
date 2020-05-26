const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = `
    mutation($cartId: String!) {
        applyStoreCreditToCart(input: { cart_id: $cartId }) {
            cart {
                ${cartOutput}
            }
        }
    }
`;

async function applyStoreCreditToCart(parent, variables, context) {
    const { cart_id } = variables.input;
    const vars = {
        cartId: cart_id,
    };

    const res = await requestGraph(query, vars, context);
    if (res.applyStoreCreditToCart) {
        return res.applyStoreCreditToCart;
    }
    return res;
}

module.exports = applyStoreCreditToCart;
