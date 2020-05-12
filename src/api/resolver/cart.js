/* eslint-disable no-unused-vars */
const requestGraph = require('../graphql-request');

const query = `
query getCartData($cartId: String!) {
    cart(cart_id: $cartId) {
        id
        total_quantity
        prices {
            grand_total {
                currency
                value
            }
            discounts {
                amount {
                  currency
                  value
                }
                label
            }
        }
        items {
            id
            quantity
            ... on ConfigurableCartItem {
              configurable_options {
                id
                option_label
                value_id
                value_label
                __typename
              }
            }
            prices {
                price { 
                    currency
                    value
                }
            }
            product {
              id
              name
              url_key
              price_range {
                maximum_price {
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
              small_image {
                url
                label
              }
              crosssell_products {
                id
                name
                url_key
                price_range {
                  maximum_price {
                    regular_price {
                      currency
                      value
                    }
                    final_price {
                      value
                      currency
                    }
                  }
                }
                small_image {
                  url
                  label
                }
              }
            }
          }
    }   
}
`;
async function cart(parent, { cartId }, context) {
    const res = await requestGraph(query, { cartId }, context);
    if (res.cart && res.cart) {
        return res.cart;
    }
    return null;
}

module.exports = cart;
