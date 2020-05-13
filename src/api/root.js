const { generateCustomerToken, revokeCustomerToken } = require('./resolver/createCustomerToken');

module.exports = {
    generateCustomerToken,
    revokeCustomerToken,
};
