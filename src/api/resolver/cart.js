/* eslint-disable no-unused-vars */
const { productImageSize } = require('../../../swift.config');

const requestGraph = require('../graphql-request');

const query = `
query getCartData($cart_id: String!) {
    cart(cart_id: $cart_id) {
      id
      total_quantity
      email
      billing_address {
        city
        company
        country {
            code
            label
        }
        firstname
        lastname
        postcode
        region {
            code
            label
        }
        street
        telephone
      }
      shipping_addresses {
        city
        company
        country {
            code
            label
        }
        firstname
        lastname
        postcode
        region {
            code
            label
        }
        street
        telephone
        available_shipping_methods {
            available
            method_code
            carrier_code
            method_title
            carrier_title
            amount {
                value
                currency
            }
        }
        selected_shipping_method {
            method_code
            carrier_code
            amount {
                value
                currency
            }
        }
      }
      selected_payment_method {
        code
      }
      available_payment_methods {
          code
          title
      }
      applied_coupons {
          code
      }
      applied_store_credit {
        is_use_store_credit
        store_credit_amount
      }
      prices {
          discounts {
              amount {
                  currency
                  value
              }
              label
          }
          subtotal_excluding_tax {
            value
            currency
          }
          grand_total {
              currency
              value
          }
      }
      items {
        id
        product {
          name
          image {
              url
              label
          }
          categories {
            name
          }
        }
        quantity
          prices {
            discounts {
              amount {
                currency
                value
              }
            }
            price {
              value
              currency
            }
            row_total {
              currency
              value
            }
            total_item_discount {
              currency
              value
            }
        }
        ... on  ConfigurableCartItem {
          configurable_options {
            option_label
            value_label
          }
        }
        product {
          id
          name
          small_image {
            url(width: ${productImageSize.width}, height: ${productImageSize.height}),
            label
          }
          categories {
            name
          }
          url_key
          sku
          stock_status
          crosssell_products {
            id
            name
            url_key
            thumbnail {
              url
            }
            small_image {
              url(width: ${productImageSize.width}, height: ${productImageSize.height}),
              label
            }
            price_tiers {
              discount {
                percent_off
                amount_off
              }
              final_price {
                currency
                value
              }
              quantity
            }
            price_range {
              maximum_price {
                discount {
                  amount_off
                  percent_off
                }
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                discount {
                  amount_off
                  percent_off
                }
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
          }
        }
      }
    }   
}
`;
async function cart(parent, { cart_id }, context) {
    if (cart_id) {
        const res = await requestGraph(query, { cart_id }, context);
        if (res.cart) {
            return res.cart;
        }
        return res;
    }
    return {
        message: 'Required parameter "cart_id" is missing',
        extensions: { category: 'graphql-input' },
        path: ['cart'],
        status: 200,
    };
}

module.exports = cart;
