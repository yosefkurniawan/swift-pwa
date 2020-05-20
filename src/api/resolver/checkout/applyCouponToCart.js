const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = `
    mutation($cartId: String!, $coupon: String!) {
        applyCouponToCart(input: { cart_id: $cartId, coupon_code: $coupon }) {
            cart {
                ${cartOutput}
            }
        }
    }
`;

async function applyCouponToCart(parent, variables, context) {
    const { cart_id, coupon_code } = variables.input;
    const vars = {
        cartId: cart_id,
        coupon: coupon_code,
    };

    const res = await requestGraph(query, vars, context);
    if (res.applyCouponToCart) {
        return res.applyCouponToCart;
    }
    return res;
}

module.exports = applyCouponToCart;
