/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
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


const createCustomerToken = async (parent, { username, password }, context) => {
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
    return {
        originalToken: '',
        token: '',
        message: 'failed to create customer token',
    };
};


module.exports = createCustomerToken;
