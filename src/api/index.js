/* eslint-disable no-param-reassign */
const { mergeSchemas } = require('graphql-tools');

const cartSchema = require('./schema/cartSchema');
const generateCustomerTokenSchema = require('./schema/generateCustomerToken');
const addSimpleProductsToCart = require('./schema/addSimpleProductsToCart');
const addConfigurableProductsToCart = require('./schema/addConfigurableProductToCart');
const customerOrdersSchema = require('./schema/customerOrders');
const customerSchema = require('./schema/customer');
const checkout = require('./schema/checkout');

const cart = require('./resolver/cart');
const customerOrders = require('./resolver/customerOrders');
const customerCart = require('./resolver/customerCart');
const customer = require('./resolver/customer/customer');

const schema = mergeSchemas({
    schemas: [
        cartSchema, generateCustomerTokenSchema, addSimpleProductsToCart, addConfigurableProductsToCart,
        customerOrdersSchema, customerSchema, checkout,
    ],
    resolvers: {
        Query: {
            cart,
            customerOrders,
            customer,
            customerCart,
        },
    },
});

module.exports = schema;
