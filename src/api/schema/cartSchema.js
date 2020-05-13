const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');

const { gql } = require('apollo-server-express');
const cart = require('./cart');

const cartSchema = makeExecutableSchema({
    typeDefs: gql`
      ${cart}
      type Query {
        cart(cartId: String!): Cart!
      }

      input RemoveItemFromCartInput {
        cart_id: String!
        cart_item_id: Int!
      }

      type RemoveItemFromCartOutput {
        cart: Cart!
      }
      

      input CustomizableOptionInput {
        id: Int!
        value_string: String!
      }

      input  CartItemUpdateInput {
        cart_item_id: Int!
        customizable_options: CustomizableOptionInput
        quantity: Float
      }

      input UpdateCartItemsInput {
        cart_id: String!
        cart_items: CartItemUpdateInput
      }

      type UpdateCartItemsOutput {
        cart: Cart!
      }

      type Mutation {
        removeItemFromCart(input: RemoveItemFromCartInput): RemoveItemFromCartOutput
        updateCartItems(input: UpdateCartItemsInput): UpdateCartItemsOutput
      }
    `,
});

addMockFunctionsToSchema({ schema: cartSchema });

module.exports = cartSchema;
