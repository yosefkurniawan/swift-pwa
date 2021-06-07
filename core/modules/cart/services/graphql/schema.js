/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';
import config from '@config';

const { modules } = config;

const applied_store_credit = modules.storecredit.useCommerceModule
    ? `
applied_store_credit {
    applied_balance {
      currency
      value
    }
    current_balance {
      currency
      value
    }
    enabled
}
`
    : `
applied_store_credit {
    store_credit_amount
    is_use_store_credit
}
`;

const applied_cashback = `
applied_cashback {
    data {
        amount
        promo_name
    }
    is_cashback
    total_cashback
}
`;

const applied_reward_points = `
applied_reward_points {
    is_use_reward_points
    reward_points_amount
}
`;

const applied_coupons = `
applied_coupons {
    code
}
`;

const applied_extrafee = `
applied_extra_fee {
    extrafee_value {
      currency
      value
    }
    select_options {
      default
      label
      option_id
      price
    }
    show_on_cart
    title
}
addtional_fees {
    data {
      enabled
      fee_name
      frontend_type
      id_fee
      options {
        default
        label
        option_id
        price
      }
    }
    show_on_cart
}
`;

const applied_giftcard = modules.giftcard.useCommerceModule
    ? `
applied_gift_cards {
    applied_balance {
      currency
      value
    }
    code
    current_balance {
      currency
      value
    }
}
`
    : `
applied_giftcard {
    giftcard_amount
    giftcard_detail {
        giftcard_amount_used
        giftcard_code
    }
}

`;

const prices = `
prices {
  discounts {
      amount {
          currency
          value
      }
      label
  }
  subtotal_excluding_tax {
      currency
      value
  }
  subtotal_including_tax {
      currency
      value
  }
  applied_taxes {
      amount {
          value
          currency
      }
  }
  grand_total {
      currency
      value
  }
}
`;

const customizable_options = `
customizable_options {
  id
  label
  is_required
  sort_order
  values {
    label
    value
    price {
      type
      units
      value
    }
  }
}
`;

const items = `
items {
  id
  quantity
  ... on SimpleCartItem {
    ${customizable_options}
  }

  ... on VirtualCartItem {
    ${customizable_options}
  }
  ... on ConfigurableCartItem {
      ${customizable_options}
      configurable_options {
      option_label
      value_label
    }
  }
  ... on BundleCartItem {
    bundle_options {
      label
      type
      values {
        label
        price
        quantity
      }
    }
  }
  ... on DownloadableCartItem {
    ${customizable_options}
    links {
      title
    }
  }
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
    price_including_tax {
      value
      currency
    }
    row_total_including_tax {
      currency
      value
    }
    total_item_discount {
      currency
      value
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
    categories {
      name
    }
  }
}
`;

const cartRequiredSelection = `
id
errorItems
total_quantity
${modules.checkout.cashback.enabled ? applied_cashback : ''}
${modules.rewardpoint.enabled ? applied_reward_points : ''}
${modules.promo.enabled ? applied_coupons : ''}
${modules.checkout.extraFee.enabled ? applied_extrafee : ''}
${modules.storecredit.enabled ? applied_store_credit : ''}
${prices}
${items}
`;
export const getCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            ${applied_giftcard}
            ${cartRequiredSelection}
        }
    }
`;

export const getCrossellCart = gql`
query getCartData($cartId: String!) {
  cart(cart_id: $cartId) {
     items {
      product {
        crosssell_products {
          id
          name
          url_key
          sku
          ${modules.catalog.productListing.label.weltpixel.enabled ? `
          weltpixel_labels {
            categoryLabel {
                css
                customer_group
                image
                page_position
                position
                priority
                text
                text_padding
                text_bg_color
                text_font_size
                text_font_color          
            }
            productLabel {
                css
                customer_group
                image
                page_position
                position
                priority
                text
                text_padding
                text_bg_color
                text_font_size
                text_font_color  
            }
          }        
          ` : ''}
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

export const getMiniCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            errorItems
            total_quantity
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
                subtotal_including_tax {
                  currency
                  value
                }
            }
            items {
              id
              quantity
              ... on SimpleCartItem {
                ${customizable_options}
              }

              ... on VirtualCartItem {
                ${customizable_options}
              }

              ... on ConfigurableCartItem {
                  ${customizable_options}
                  configurable_options {
                  option_label
                  value_label
                }
              }
              ... on BundleCartItem {
                bundle_options {
                  label
                  type
                  values {
                    label
                    price
                    quantity
                  }
                }
              }
              ... on DownloadableCartItem {
                ${customizable_options}
                links {
                  title
                }
              }
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
                row_total_including_tax {
                  currency
                  value
                }
                total_item_discount {
                  currency
                  value
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
              }
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
          ${items}
        }
      }
    }
`;

export const deleteCartItemOnPage = gql`
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        cart {
          id
          total_quantity
          ${applied_giftcard}
          ${modules.checkout.cashback.enabled ? applied_cashback : ''}
          ${modules.rewardpoint.enabled ? applied_reward_points : ''}
          ${modules.promo.enabled ? applied_coupons : ''}
          ${modules.checkout.extraFee.enabled ? applied_extrafee : ''}
          ${modules.storecredit.enabled ? applied_store_credit : ''}
          ${prices}
          ${items}
        }
      }
    }
`;

export const updateCartitem = gql`
    mutation updateCartItems($cartId: String!, $cart_item_id: Int!, $quantity: Float!) {
      updateCartItems(
        input: { 
          cart_id: $cartId,
          cart_items: {cart_item_id: $cart_item_id, quantity: $quantity }
        }
      ) {
        cart {
          ${applied_giftcard}
          ${cartRequiredSelection}
        }
      }
    }
`;

export const addWishlist = gql`
    mutation addWishlist($productId: Int!) {
        addProductToWishlist(productId: $productId) {
            info
        }
    }
`;

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const getCountCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
        }
    }
`;

// reorder
export const reOrder = gql`
mutation reOrder($order_id: String!) {
  reorder(input: {order_id: $order_id}) {
    cart_id
  }
}
`;
