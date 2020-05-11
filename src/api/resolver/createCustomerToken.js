/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');


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
    if (res.generateCustomerToken) {
        context.session.token = res.generateCustomerToken.token;
        return {
            token: res.generateCustomerToken.token,
            message: 'welcome',
        };
    }
    return {
        token: 'asdasdasd',
        message: 'Error',
    };
}

module.exports = createToken;
