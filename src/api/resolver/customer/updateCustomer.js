/* eslint-disable no-param-reassign */
const requestGraph = require('../../graphql-request');
const customerOutput = require('./schema/customerOutput');

const query = `
    mutation updateCustomer(
        $firstname: String!, 
        $lastname: String!, 
        $email: String!,
        $password: String!
    ) {
        updateCustomer(
            input: {
                firstname: $firstname,
                lastname: $lastname,
                email: $email,
                password: $password
            }
        ) {
            customer {
                ${customerOutput}
            }
        }
    }
`;

const querySettings = `
    mutation updateCustomer(
        $is_subscribed: Boolean!
    ) {
        updateCustomer(
            input: {
                is_subscribed: $is_subscribed,
            }
        ) {
            customer {
                ${customerOutput}
            }
        }
    }
`;

async function updateCustomer(parent, variables, context) {
    const res = await requestGraph(typeof variables.input.is_subscribed !== 'undefined' ? querySettings : query, variables.input, context);
    if (res.updateCustomer) {
        return res.updateCustomer;
    }
    return res;
}

module.exports = updateCustomer;
