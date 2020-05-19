const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = `
    mutation($cartId: String!, $carrierCode: String!, $methodCode: String!) {
        setShippingMethodsOnCart(input: { cart_id: $cartId, shipping_methods: { carrier_code: $carrierCode, method_code: $methodCode } }) {
            cart {
                ${cartOutput}
            }
        }
    }
`;

async function setShippingMethodsOnCart(parent, variables, context) {
    const { cart_id, shipping_methods } = variables.input;
    const [shipping] = shipping_methods;

    const vars = {
        cartId: cart_id,
        carrierCode: shipping.carrier_code,
        methodCode: shipping.method_code,
    };

    const res = await requestGraph(query, vars, context);

    if (res.setShippingMethodsOnCart) {
        return res.setShippingMethodsOnCart;
    }
    return res;
}

module.exports = setShippingMethodsOnCart;
