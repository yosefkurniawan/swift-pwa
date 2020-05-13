/* eslint-disable no-param-reassign */
const {
    mergeSchemas,
} = require('graphql-tools');

const cartSchema = require('./schema/cart');
const generateCustomerTokenSchema = require('./schema/generateCustomerToken');

const cart = require('./resolver/cart');

const schema = mergeSchemas({
    schemas: [cartSchema, generateCustomerTokenSchema],
    resolvers: {
        Query: {
            cart,
        },
    },
});

module.exports = schema;
