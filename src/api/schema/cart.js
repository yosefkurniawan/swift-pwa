
const Product = require('./product');

const schema = `
  ${Product}
  interface CartAddressInterface {
    city: String!
    company: String
    country: CartAddressCountry!
    firstname: String!
    lastname: String!
    postcode: String
    region: CartAddressRegion
    street: [String]!
    telephone: String!
  }
  type Discount {
    amount: Money!
    label: String!
  }

  type CartTaxItem {
    amount: Money!
    label: String!
  }

  type CartDiscount {
    amount: Money!
    label: [String]!
  }

  type CartPrices {
    applied_taxes: [CartTaxItem]
    discounts: [Discount]
    grand_total: Money
    subtotal_excluding_tax: Money
    subtotal_including_tax: Money
    subtotal_with_discount_excluding_tax: Money
    discount: CartDiscount
  }

  type CartItemPrices {
    discounts: [Discount]
    price: Money!
    row_total: Money!
    row_total_including_tax: Money!
    total_item_discount: Money
  }

  type CartAddressRegion {
    code: String!
    label: String!
  }

  type SelectedConfigurableOption {
    id: Int!
    option_label: String!
    value_id: Int!
    value_label: String!
  }
  enum PriceTypeEnum {
    FIXED
    PERCENT
    DYNAMIC
  }

  type CartItemSelectedOptionValuePrice {
    type: PriceTypeEnum!
    units: String!
    value: Float!
  }
  type SelectedCustomizableOption {
    id: Int!
    is_required: Boolean!
    label: String!
    sort_order: Int!
    values: [SelectedCustomizableOptionValue]!
  }

  type SelectedCustomizableOptionValue {
    id: Int!
    label: String!
    price: CartItemSelectedOptionValuePrice!
    value: String!
  }
  
  type ConfigurableCartItem
    implements CartItemInterface {
    configurable_options: [SelectedConfigurableOption]!
    customizable_options: [SelectedCustomizableOption]!
    id: String!
    prices: CartItemPrices
    product: Product!
    quantity: Float!
  }

  interface CartItemInterface {
    id: String!
    prices: CartItemPrices
    product: Product!
    quantity: Float!
  }

  type CartAddressCountry {
    code: String!
    label: String!
  }

  type BillingCartAddress
    implements CartAddressInterface {
    city: String!
    company: String
    country: CartAddressCountry!
    firstname: String!
    lastname: String!
    postcode: String
    region: CartAddressRegion
    street: [String]!
    telephone: String!
    customer_notes: String
  }

  type AvailablePaymentMethod {
    code: String!
    title: String!
  }

  type AppliedStoreCreditOutput {
    is_use_store_credit: Int
    store_credit_amount: Float
  }

  type AppliedGiftCardDetail {
    giftcard_amount_used: Float
    giftcard_code: String
  }
  
  type AppliedGiftCardForQuote {
    giftcard_amount: Float
    giftcard_detail: [AppliedGiftCardDetail]
  }

  type AppliedCoupon {
    code: String!
  }

  type SelectedPaymentMethod {
    code: String!
    purchase_order_number: String
    title: String!
  }

  type AvailableShippingMethod {
    amount: Money!
    available: Boolean!
    carrier_code: String!
    carrier_title: String!
    error_message: String
    method_code: String
    method_title: String
    price_excl_tax: Money!
    price_incl_tax: Money!
    base_amount: Money
  }
  
  type SelectedShippingMethod {
    amount: Money!
    carrier_code: String!
    carrier_title: String!
    method_code: String!
    method_title: String!
    base_amount: Money
  }

  type CartItemQuantity {
    cart_item_id: Int!
    quantity: Float!
  }

  type ShippingCartAddress
    implements CartAddressInterface {
    available_shipping_methods: [AvailableShippingMethod]
    cart_items_v2: [CartItemInterface]
    city: String!
    company: String
    country: CartAddressCountry!
    customer_notes: String
    firstname: String!
    lastname: String!
    postcode: String
    region: CartAddressRegion
    selected_shipping_method: SelectedShippingMethod
    street: [String]!
    telephone: String!
    cart_items: [CartItemQuantity]
    items_weight: Float
  }

  type AppliedGiftCardDetail {
    giftcard_amount_used: Float
    giftcard_code: String
  }

  type AppliedGiftCardForQuote {
    giftcard_amount: Float
    giftcard_detail: [AppliedGiftCardDetail]
  }

  type Cart {
    applied_coupons: [AppliedCoupon]
    applied_giftcard: AppliedGiftCardForQuote
    applied_store_credit: AppliedStoreCreditOutput
    applied_giftcard: AppliedGiftCardForQuote
    available_payment_methods: [AvailablePaymentMethod]
    billing_address: BillingCartAddress
    email: String
    id: ID!
    is_virtual: Boolean!
    items: [ConfigurableCartItem]
    prices: CartPrices
    selected_payment_method: SelectedPaymentMethod
    shipping_addresses: [ShippingCartAddress]!
    total_quantity: Float!
    applied_coupon: AppliedCoupon
  }

  type Query {
    cart(cart_id: String!): Cart!
    customerCart: Cart!
  }
  
`;

module.exports = schema;
