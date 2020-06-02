/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../helpers/encryption');

const query = `
    mutation register(
        $firstName: String!,
        $lastName: String,
        $email: String!,
        $password: String!,
        $phoneNumber: String!,
        $subscribe: Boolean,
        $otp: String!,
    ) {
        createCustomerCustom(
            input: {
              firstname: $firstName,
              lastname: $lastName,
              email: $email,
              password: $password,
              phonenumber: $phoneNumber,
              is_subscribed: $subscribe,
              otp: $otp,
            }
          ) {
            token
        }
    }
`;


const internalCreateCustomerToken = async (parent, args, context) => {
    const variables = {
        firstName: args.input.firstname,
        lastName: args.input.lastname,
        email: args.input.email,
        password: args.input.password,
        phoneNumber: args.input.phonenumber,
        subscribe: args.input.is_subscribe,
        otp: args.input.otp,
    };
    console.log(variables);
    const res = await requestGraph(query, variables, context);
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
};


module.exports = internalCreateCustomerToken;
