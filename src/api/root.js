
const generateCustomerToken = require('./resolver/createCustomerToken');
const revokeCustomerToken = require('./resolver/revokeCustomerToken');
const updateCartItems = require('./resolver/updateCartItems');
const removeItemFromCart = require('./resolver/removeItemFromCart');
const mergeCarts = require('./resolver/mergeCarts');
const addSimpleProductsToCart = require('./resolver/addSimpleProductsToCart');
const addConfigurableProductsToCart = require('./resolver/addConfigurableProductToCart');
const addProductToWishlist = require('./resolver/addProductToWishlist');
const removeItemWishlist = require('./resolver/removeItemWishlist');
const updateCustomer = require('./resolver/customer/updateCustomer');
const changeCustomerPassword = require('./resolver/customer/changeCustomerPassword');
const createCustomerAddress = require('./resolver/customer/createCustomerAddress');

module.exports = {
    generateCustomerToken,
    addSimpleProductsToCart,
    addConfigurableProductsToCart,
    revokeCustomerToken,
    updateCartItems,
    removeItemFromCart,
    mergeCarts,
    addProductToWishlist,
    removeItemWishlist,
    updateCustomer,
    changeCustomerPassword,
    createCustomerAddress,
};
