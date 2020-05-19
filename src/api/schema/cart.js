
const Product = require('./product');

const schema = `
  ${Product}
  type grand_total {
    currency: String
    value: Float
  }
  type Discounts {
    amount: Money
    label: String
  }
  type prices {
    grand_total: grand_total
    discounts: [Discounts]
    subtotal_excluding_tax: Money
  }
  type CartItemPrices {
    price: Money
    discounts: [Discounts]
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

  type CartAddressRegion {
    code: String
    label: String
  }

  type CartAddressCountry {
    code: String
    label: String
  }

  interface CartAddressInterface {
      firstname: String!
      lastname: String!
      company: String
      street: [String!]!
      city: String!
      region: CartAddressRegion
      postcode: String
      country: CartAddressCountry!
      telephone: String!
  }

  type BillingCartAddress implements CartAddressInterface {
    firstname: String!
    lastname: String!
    company: String
    street: [String!]!
    city: String!
    region: CartAddressRegion
    postcode: String
    country: CartAddressCountry!
    telephone: String!
  }

  type AvailableShippingMethod {
    available: Boolean
    method_code: String
    carrier_code: String
    method_title: String
    carrier_title: String
    amount: Money
  }

  type SelectedShippingMethod {
    method_code: String
    carrier_code: String
    amount: Money
  }

  type ShippingCartAddress implements CartAddressInterface{
    firstname: String!
    lastname: String!
    company: String
    street: [String!]!
    city: String!
    region: CartAddressRegion
    postcode: String
    country: CartAddressCountry!
    telephone: String!
    available_shipping_methods: [AvailableShippingMethod]
    selected_shipping_method: SelectedShippingMethod
  }

  type SelectedPaymentMethod {
    code: String
    purchase_order_number: String
    title: String
  }

  type AvailablePaymentMethod {
    code: String
    title: String
  }

  type Cart {
    id: String,
    email: String
    billing_address: BillingCartAddress
    shipping_addresses: [ShippingCartAddress]
    selected_payment_method: SelectedPaymentMethod
    available_payment_methods: [AvailablePaymentMethod]
    total_quantity: Int
    applied_coupons: [AppliedCoupon]
    prices: prices
    items: [CartItemInterface]!
  }

  type Query {
    cart(cart_id: String!): Cart!
    customerCart: Cart!
  }
  
`;

module.exports = schema;
