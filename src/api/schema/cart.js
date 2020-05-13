
const Product = require('./product');

const schema = `
${Product}
      type grand_total {
        currency: String
        value: Float
      }

      type discount {
        currency: String
        value: Int
      }

      type prices {
        grand_total: grand_total
        discount: discount
      }

      type CartItemPrices {
        price: Money
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

      type Cart {
        id: String,
        total_quantity: Int
        prices: prices
        items: [CartItemInterface]!
      }
`;

module.exports = schema;
