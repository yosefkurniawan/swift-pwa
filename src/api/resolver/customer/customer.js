/* eslint-disable no-unused-vars */
const requestGraph = require('../../graphql-request');
const customerOutput = require('./schema/customerOutput');

const query = `
    query customer ($pageSizeStoreCredit: Int! , $currentPageStoreCredit: Int!) {
        customer {
            ${customerOutput}
        }
    }
`;

async function customer(parent, args, context) {
    const variables = {
        pageSizeStoreCredit: args.pageSizeStoreCredit ? args.pageSizeStoreCredit : 10,
        currentPageStoreCredit: args.currentPageStoreCredit ? args.currentPageStoreCredit : 1,
    };
    const res = await requestGraph(query, variables, context);
    if (res && res.customer) {
        return res.customer;
    }
    return res;
}

module.exports = customer;
