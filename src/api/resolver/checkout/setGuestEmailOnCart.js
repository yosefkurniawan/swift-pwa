const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = `
    mutation($cartId: String!, $email: String!) {
        setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
            cart {
                ${cartOutput}
            }
        }
    }
`;

async function setGuestEmailOnCart(parent, variables, context) {
    const res = await requestGraph(query, variables.input, context);
    if (res.setGuestEmailOnCart) {
        return res.setGuestEmailOnCart;
    }
    return res;
}

module.exports = setGuestEmailOnCart;
