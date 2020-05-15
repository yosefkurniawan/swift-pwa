/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
    mutation addWishlist($productId: Int!) {
        addProductToWishlist(productId: $productId) {
            info
        }
}
`;

async function adProductToWishlist(parent, args, context) {
    const res = await requestGraph(query, { productId: args.productId }, context);
    if (res.adProductToWishlist) {
        return res.adProductToWishlist;
    }
    return res;
}

module.exports = adProductToWishlist;
