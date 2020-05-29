/* eslint-disable no-param-reassign */
const createCustomerToken = require('./createCustomerToken');
const deleteCustomerToken = require('./deleteCustomerToken');

const resolver = {
    Mutation: {
        createCustomerToken,
        deleteCustomerToken,
    },
};

module.exports = resolver;
