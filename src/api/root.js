const generateCustomerToken = require('./resolver/createCustomerToken');
const revokeCustomerToken = require('./resolver/revokeCustomerToken');
const updateCartItems = require('./resolver/updateCartItems');
const removeItemFromCart = require('./resolver/removeItemFromCart');
const mergeCarts = require('./resolver/mergeCarts');
const addSimpleProductsToCart = require('./resolver/addSimpleProductsToCart');
const addConfigurableProductsToCart = require('./resolver/addConfigurableProductToCart');
const addProductToWishlist = require('./resolver/addProductToWishlist');
const removeItemWishlist = require('./resolver/removeItemWishlist');

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
};
