/* eslint-disable no-unused-vars */
const requestGraph = require('../../graphql-request');
const customerOutput = require('./schema/customerOutput');

const query = `
    query customer {
        ${customerOutput}
    }
`;

async function customer(parent, variables, context) {
    const res = await requestGraph(query, {}, context);
    if (res && res.customer) {
        return res.customer;
    }
    return res;
}

module.exports = customer;
