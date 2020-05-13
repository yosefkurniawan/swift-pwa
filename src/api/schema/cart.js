const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');

const { gql } = require('apollo-server-express');
const Product = require('./product');

const cartSchema = makeExecutableSchema({
    typeDefs: gql`
      ${Product}
      type grand_total {
        currency: String
        value: Float
      }

      type Discounts {
        amount: Money
        label: Int
      }

      type prices {
        grand_total: grand_total
        discounts: Discounts
      }

      type CartItemPrices {
        price: Money
        discounts: Discounts
        row_total: Money
        total_item_discount: Money
      }

      type SelectedConfigurableOptions {
        id: Int
        option_label: String
        value_id: Int
        value_label: String
      }

      interface ConfigurableCartItem {
        configurable_options: [SelectedConfigurableOptions]
      }

      type CartItemInterface implements ConfigurableCartItem {
        id: String
        configurable_options: [SelectedConfigurableOptions]
        product: Product
        quantity: Float
        prices: CartItemPrices
      }

      type AppliedCoupon {
        code: String
      }

      type Cart {
        id: String,
        total_quantity: Int
        applied_coupons: AppliedCoupon
        prices: prices
        items: [CartItemInterface]!
      }
  
      type Query {
        cart(cart_id: String!): Cart!
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
