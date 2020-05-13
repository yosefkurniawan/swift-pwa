const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const { gql } = require('apollo-server-express');
const cart = require('./cart');

const addSimpleProductToCartSchema = makeExecutableSchema({
    typeDefs: gql`
        input CustomizableOptionInput {
            id: Int!,
            value_string: String!
        }
        input CartItemInput {
            quantity: Float!,
            sku: String!
        }

        input SimpleProductCartItemInput {
            customizable_options: SimpleProductCartItemInput,
            data: CartItemInput!
        }

        input AddSimpleProductsToCartInput {
            cart_id: String!,
            cart_items: SimpleProductCartItemInput
        }

        ${cart}

        type AddSimpleProductsToCartOutput {
            cart: Cart!
        }

        type Query {
            getCart: Cart
        }

        type Mutation {
            addSimpleProductsToCart(input: AddSimpleProductsToCartInput): AddSimpleProductsToCartOutput
        }
    `,
});

addMockFunctionsToSchema({ schema: addSimpleProductToCartSchema });

module.exports = addSimpleProductToCartSchema;
