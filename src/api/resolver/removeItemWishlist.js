/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
    mutation removeWishlist($wishlistItemId: Int!) {
        removeItemWishlist(wishlistItemId: $wishlistItemId) {
            info
        }
    }
`;

async function removeItemWishlist(parent, args, context) {
    const res = await requestGraph(query, { wishlistItemId: args.wishlistItemId }, context);
    if (res.removeItemWishlist) {
        return res.removeItemWishlist;
    }
    return res;
}

module.exports = removeItemWishlist;
