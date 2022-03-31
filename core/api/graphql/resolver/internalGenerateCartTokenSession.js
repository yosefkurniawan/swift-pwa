/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `
    mutation setCheckoutSession($cartId: String!) {
        setCheckoutSession(
            input: {
                cart_id: $cartId
            }
        ) {
            checkout_token
        }
    }
`;

const internalGenerateCartTokenSession = async (parent, args, context) => {
    const variables = {
        cartId: args.input.cart_id,
    };
    const res = await requestGraph(query, variables, context);
    if (res.setCheckoutSession) {
        context.session.checkoutToken = encrypt(res.setCheckoutSession.checkout_token);
        return {
            message: `Checkout Token for cart ${variables.cartId} is created`,
        };
    }
    return res;
};

module.exports = internalGenerateCartTokenSession;
