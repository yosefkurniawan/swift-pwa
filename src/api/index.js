/* eslint-disable no-param-reassign */
const { mergeSchemas } = require('graphql-tools');

const cartSchema = require('./schema/cartSchema');
const generateCustomerTokenSchema = require('./schema/generateCustomerToken');
const addSimpleProductsToCart = require('./schema/addSimpleProductsToCart');
const addConfigurableProductsToCart = require('./schema/addConfigurableProductToCart');
const customerOrdersSchema = require('./schema/customerOrders');

const cart = require('./resolver/cart');
const customerOrders = require('./resolver/customerOrders');

const schema = mergeSchemas({
    schemas: [
        cartSchema, generateCustomerTokenSchema, addSimpleProductsToCart, addConfigurableProductsToCart,
        customerOrdersSchema,
    ],
    resolvers: {
        Query: {
            cart,
            customerOrders,
        },
    },
});

module.exports = schema;
