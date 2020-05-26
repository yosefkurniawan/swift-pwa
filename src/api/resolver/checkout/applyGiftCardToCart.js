const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = `
    mutation($cartId: String! $code: String!) {
        applyGiftCardToCart(
            input: {
                cart_id: $cartId,
                giftcard_code: $code,
            }
        ) {
            cart {
                ${cartOutput}
            }
        }
    }
`;

async function applyGiftCardToCart(parent, variables, context) {
    const { cart_id, giftcard_code } = variables.input;

    const vars = {
        cartId: cart_id,
        code: giftcard_code,
    };

    const res = await requestGraph(query, vars, context);
    if (res.applyGiftCardToCart) {
        return res.applyGiftCardToCart;
    }
    return res;
}

module.exports = applyGiftCardToCart;
