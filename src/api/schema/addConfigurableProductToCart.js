const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const { gql } = require('apollo-server-express');
const cart = require('./cart');

const addConfigProductToCartSchema = makeExecutableSchema({
    typeDefs: gql`
        ${cart}
        input CustomizableOptionInput {
            id: Int!,
            value_string: String!
        }
        input CartItemInput {
            quantity: Float!,
            sku: String!
        }

        input ConfigurableProductCartItemInput {
            customizable_options: CustomizableOptionInput,
            data: CartItemInput!,
            parent_sku: String,
            variant_sku: String
        }

        input AddConfigurableProductsToCartInput {
            cart_id: String!,
            cart_items: ConfigurableProductCartItemInput
        }

        type AddConfigurableProductsToCartOutput {
            cart: Cart!
        }

        type Mutation {
            addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): AddConfigurableProductsToCartOutput
        }
    `,
});

addMockFunctionsToSchema({ schema: addConfigProductToCartSchema });

module.exports = addConfigProductToCartSchema;
