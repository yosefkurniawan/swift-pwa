/* eslint-disable no-unused-vars */
const requestGraph = require('../graphql-request');

const query = `
query getCartData($cart_id: String!) {
    cart(cart_id: $cart_id) {
      id
      total_quantity
      applied_coupons {
          code
      }
      prices {
          discounts {
              amount {
                  currency
                  value
              }
              label
          }
          grand_total {
              currency
              value
          }
      }
      items {
        id
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
            url
            label
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
              url,
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
