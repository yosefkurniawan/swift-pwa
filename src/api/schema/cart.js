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
    `,
});

addMockFunctionsToSchema({ schema: cartSchema });

module.exports = cartSchema;
