/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
mutation {
    revokeCustomerToken {
        result
    }
}
`;


async function revokeCustomerToken(parent, args, context) {
    const res = await requestGraph(query, { }, context);
    context.session.token = null;
    if (res.revokeCustomerToken) {
        return {
            result: true,
        };
    }
    return {
        result: false,
    };
}

module.exports = revokeCustomerToken;
