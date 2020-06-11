/* eslint-disable no-param-reassign */
const internalGenerateCustomerToken = require('./internalGenerateCustomerToken');
const internalCreateCustomerToken = require('./internalCreateCustomerToken');
const internalCreateCustomerTokenOtp = require('./internalCreateCustomerTokenOtp');
const internalDeleteCustomerToken = require('./internalDeleteCustomerToken');

const resolver = {
    Mutation: {
        internalGenerateCustomerToken,
        internalCreateCustomerToken,
        internalCreateCustomerTokenOtp,
        internalDeleteCustomerToken,
    },
};

module.exports = resolver;
