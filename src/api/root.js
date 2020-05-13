const generateCustomerToken = require('./resolver/createCustomerToken');
const revokeCustomerToken = require('./resolver/revokeCustomerToken');
const updateCartItems = require('./resolver/updateCartItems');
const removeItemFromCart = require('./resolver/removeItemFromCart');

module.exports = {
    generateCustomerToken,
    revokeCustomerToken,
    updateCartItems,
    removeItemFromCart,
};
