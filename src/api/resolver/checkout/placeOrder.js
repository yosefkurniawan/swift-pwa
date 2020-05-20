const requestGraph = require('../../graphql-request');

const query = `
    mutation($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) {
            order {
                order_number
            }
        }
    }
`;

async function placeOrder(parent, variables, context) {
    const { cart_id } = variables.input;

    const vars = {
        cartId: cart_id,
    };

    const res = await requestGraph(query, vars, context);
    if (res.placeOrder) {
        return res.placeOrder;
    }
    return res;
}

module.exports = placeOrder;
