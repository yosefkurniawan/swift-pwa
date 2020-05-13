const generateCustomerToken = require('./resolver/createCustomerToken');
const revokeCustomerToken = require('./resolver/revokeCustomerToken');
const updateCartItems = require('./resolver/updateCartItems');
const removeItemFromCart = require('./resolver/removeItemFromCart');
const addSimpleProductsToCart = require('./resolver/addSimpleProductsToCart');
const addConfigurableProductsToCart = require('./resolver/addConfigurableProductToCart');

module.exports = {
    generateCustomerToken,
    addSimpleProductsToCart,
    addConfigurableProductsToCart,
    revokeCustomerToken,
    updateCartItems,
    removeItemFromCart,
};
