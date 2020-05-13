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

async function createToken(parent, { email, password }, context) {
    const res = await requestGraph(query, { email, password }, context);
    console.log(res);
    context.session.destroy();
    if (res.generateCustomerToken) {
        context.session.token = encrypt(res.generateCustomerToken.token);
        console.log(context.session)
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

module.exports = createToken;
