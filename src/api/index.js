/* eslint-disable no-param-reassign */
const { mergeSchemas } = require('graphql-tools');

const cartSchema = require('./schema/cartSchema');
const generateCustomerTokenSchema = require('./schema/generateCustomerToken');
const addSimpleProductsToCart = require('./schema/addSimpleProductsToCart');
const addConfigurableProductsToCart = require('./schema/addConfigurableProductToCart');

const cart = require('./resolver/cart');

const schema = mergeSchemas({
    schemas: [cartSchema, generateCustomerTokenSchema, addSimpleProductsToCart, addConfigurableProductsToCart],
    resolvers: {
        Query: {
            cart,
        },
    },
});

module.exports = schema;
