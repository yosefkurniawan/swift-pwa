/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');
const { encrypt } = require('../../helpers/encryption');

const query = `
    mutation getToken(
        $username: String!,
        $password: String!,
    ) {
        generateCustomerTokenCustom(username: $username, password: $password){
        token
        }
    }
`;


async function generateCustomerTokenCustom(parent, { username, password }, context) {
    const res = await requestGraph(query, { username, password }, context);
    // context.session.destroy();
    if (res.generateCustomerTokenCustom) {
        context.session.token = encrypt(res.generateCustomerTokenCustom.token);
        return {
            originalToken: res.generateCustomerTokenCustom.token,
            token: encrypt(res.generateCustomerTokenCustom.token),
            message: 'welcome',
        };
    }
    return res;
}


module.exports = generateCustomerTokenCustom;
