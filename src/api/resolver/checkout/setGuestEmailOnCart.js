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
    const { cart_id, email } = variables.input;

    const vars = {
        cartId: cart_id,
        email,
    };

    const res = await requestGraph(query, vars, context);
    if (res.setGuestEmailOnCart) {
        return res.setGuestEmailOnCart;
    }
    return res;
}

module.exports = setGuestEmailOnCart;
