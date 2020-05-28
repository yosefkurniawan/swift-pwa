/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
{
    customerCart {
        id
    }
}
`;

async function customerCart(parent, args, context) {
    const res = await requestGraph(query, {}, context);
    if (res.customerCart) {
        return res.customerCart;
    }
    return res;
}

module.exports = customerCart;
