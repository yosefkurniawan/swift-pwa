/* eslint-disable no-param-reassign */
const internalCreateCustomerToken = require('./internalCreateCustomerToken');
const internalCreateCustomerTokenOtp = require('./internalCreateCustomerTokenOtp');
const internalDeleteCustomerToken = require('./internalDeleteCustomerToken');

const resolver = {
    Mutation: {
        internalCreateCustomerToken,
        internalCreateCustomerTokenOtp,
        internalDeleteCustomerToken,
    },
};

module.exports = resolver;
