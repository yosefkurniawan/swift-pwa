/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');
const { encrypt } = require('../../helpers/encryption');

const query = `
    mutation getToken(
        $email: String!,
        $password: String!,
    ) {
        generateCustomerToken(email: $email, password: $password){
        token
        }
    }
`;

const revokeToken = `
    mutation {
        revokeCustomerToken {
            result
        }
    }
`;

async function generateCustomerToken(parent, { email, password }, context) {
    const res = await requestGraph(query, { email, password }, context);
    // context.session.destroy();
    if (res.generateCustomerToken) {
        context.session.token = encrypt(res.generateCustomerToken.token);
        return {
            originalToken: res.generateCustomerToken.token,
            token: encrypt(res.generateCustomerToken.token),
            message: 'welcome',
        };
    }
    return {
        token: '',
        message: 'Error',
    };
}

async function revokeCustomerToken(parent, args, context) {
    const res = await requestGraph(revokeToken, { }, context);
    context.session.destroy();
    context.session.token = '';
    if (res.revokeCustomerToken) {
        return {
            result: true,
        };
    }
    return {
        result: false,
    };
}

module.exports = { generateCustomerToken, revokeCustomerToken };
