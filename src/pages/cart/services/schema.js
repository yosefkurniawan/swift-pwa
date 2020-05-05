/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';


export const getCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
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
              ... on  ConfigurableCartItem {
                configurable_options {
                  id
                  option_label
                  value_id
                  value_label
                }
              }
              product {
                  id
                  name
                  thumbnail {
                      url
                  }
                  url_key
                  sku
                  stock_status
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
                quantity
            }
        }
    }
`;

export const deleteCartitem = gql`
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        cart {
          id
          total_quantity
        }
      }
    }
`;
