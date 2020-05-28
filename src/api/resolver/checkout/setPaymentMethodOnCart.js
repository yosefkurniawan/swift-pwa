const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = `
    mutation setPaymentMethod($cartId: String!, $code: String!) {
        setPaymentMethodOnCart(input: { cart_id: $cartId, payment_method: { code: $code } }) {
            cart {
                ${cartOutput}
            }
        }
    }
`;

async function setPaymentMethodOnCart(parent, variables, context) {
    const { cart_id, payment_method } = variables.input;

    const vars = {
        cartId: cart_id,
        code: payment_method.code,
    };

    const res = await requestGraph(query, vars, context);
    if (res.setPaymentMethodOnCart) {
        return res.setPaymentMethodOnCart;
    }
    return res;
}

module.exports = setPaymentMethodOnCart;
