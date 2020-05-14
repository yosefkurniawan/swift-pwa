/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
    mutation mergeCart(
        $sourceCartId: String!,
        $destionationCartId: String!
    ) {
        mergeCarts(
        source_cart_id:$sourceCartId,
        destination_cart_id: $destionationCartId
        ) {
        id
        total_quantity
        }
    }
`;

async function mergeCarts(parent, { source_cart_id, destination_cart_id }, context) {
    const res = await requestGraph(query, {
        sourceCartId: source_cart_id,
        destionationCartId: destination_cart_id,
    }, context);
    if (res.mergeCarts) {
        return res.mergeCarts;
    }
    return null;
}

module.exports = mergeCarts;
