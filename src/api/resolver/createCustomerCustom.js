/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');
const { encrypt } = require('../../helpers/encryption');

const query = `
mutation register(
    $firstname: String,
    $lastname: String,
    $email: String,
    $password: String,
    $phonenumber: String,
    $is_subscribed: Boolean,
    $otp: String!,
) {
    createCustomerCustom(
        input: {
          firstname: $firstname,
          lastname: $lastname,
          email: $email,
          password: $password,
          phonenumber: $phonenumber,
          is_subscribed: $is_subscribed,
          otp: $otp,
        }
      ) {
        token
      }
}
`;

async function createCustomerCustom(parent, { input }, context) {
    const res = await requestGraph(query, input, context);
    // context.session.destroy();
    if (res.createCustomerCustom) {
        context.session.token = encrypt(res.createCustomerCustom.token);
        return {
            originalToken: res.createCustomerCustom.token,
            token: encrypt(res.createCustomerCustom.token),
            message: 'welcome',
        };
    }
    return res;
}

module.exports = createCustomerCustom;
