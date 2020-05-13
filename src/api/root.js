const generateCustomerToken = require('./resolver/createCustomerToken');
const revokeCustomerToken = require('./resolver/revokeCustomerToken');

module.exports = {
    generateCustomerToken,
    revokeCustomerToken,
};
