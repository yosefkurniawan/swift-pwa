/* eslint-disable no-param-reassign */
const { mergeSchemas } = require('graphql-tools');

const cartSchema = require('./schema/cartSchema');
const generateCustomerTokenSchema = require('./schema/generateCustomerToken');
const addSimpleProductsToCart = require('./schema/addSimpleProductsToCart');
const addConfigurableProductsToCart = require('./schema/addConfigurableProductToCart');
const customerOrdersSchema = require('./schema/customerOrders');
const customerSchema = require('./schema/customer');
const checkout = require('./schema/checkout');
const giftCardAccountSchema = require('./schema/giftCardAccount');
const notification = require('./schema/notification');
const rewardPointSchema = require('./schema/customerRewardPoints');

const cart = require('./resolver/cart');
const customerOrders = require('./resolver/customerOrders');
const customerCart = require('./resolver/customerCart');
const customer = require('./resolver/customer/customer');
const giftCardAccount = require('./resolver/getCardAccount');
const customerNotificationList = require('./resolver/notification/customerNotificationList');
const customerRewardPoints = require('./resolver/customerRewarsPoints');

const schema = mergeSchemas({
    schemas: [
        cartSchema, generateCustomerTokenSchema, addSimpleProductsToCart, addConfigurableProductsToCart,
        customerOrdersSchema, customerSchema, checkout, giftCardAccountSchema, notification, rewardPointSchema,
    ],
    resolvers: {
        Query: {
            cart,
            customerOrders,
            customer,
            customerCart,
            giftCardAccount,
            customerNotificationList,
            customerRewardPoints,
        },
    },
});

module.exports = schema;
