const { imageSize } = require('../../../../../swift.config');

const productDetail = `
    id
    name
    sku
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url(width: ${imageSize.product.width}, height: ${imageSize.product.height}),
      label
    }
    image{
      url
    }

    `;
const priceRange = `
    price_range {
      minimum_price {
        discount {
          amount_off
          percent_off
        }
        final_price {
          currency
          value
        }
        fixed_product_taxes {
          amount {
            currency
            value
          }
          label
        }
        regular_price {
          currency
          value
        }
      }
      maximum_price {
         discount {
          amount_off
          percent_off
        }
        final_price {
          currency
          value
        }
        fixed_product_taxes {
          amount {
            currency
            value
          }
          label
        }
        regular_price {
          currency
          value
        }
      }
    }
    `;

const priceTiers = `
    price_tiers {
      discount {
        amount_off
        percent_off
      }
      final_price {
        currency
        value
      }
      quantity
    }
    `;

const customerOutput = `
    id
    firstname
    middlename
    suffix
    prefix
    lastname
    email
    is_subscribed
    addresses {
      id
      city
      default_billing
      default_shipping
      custom_attributes {
          attribute_code
          value
      }
      extension_attributes {
          attribute_code
          value
      }
      firstname
      lastname
      postcode
      country_code
      region {
          region
          region_code
      }
      street
      telephone
    }
    wishlist {
        id
        items {
            id
            product {
                ${productDetail}
                ${priceRange}
                ${priceTiers}
            }
        }
    }
    store_credit {
      current_balance {
          value
      }
      enabled
    }
    gift_card {
      giftcard_code
      giftcard_balance
    }
`;

const customerOutputComplete = `
    id
    firstname
    middlename
    suffix
    prefix
    lastname
    email
    is_subscribed
    store_credit {
      current_balance {
        currency
        value
      }
      enabled
      transaction_history (pageSize:$pageSizeStoreCredit, currentPage:$currentPageStoreCredit) {
        total_count
        page_info {
          current_page
          page_size
          total_pages
        }
        items {
          comment
          comment_placeholder
          store_credit_adjustment {
            currency
            value
          }
          store_credit_balance {
            currency
            value
          }
          transaction_date_time
          transaction_id
        }
      }
    }
    addresses {
      id
      city
      default_billing
      default_shipping
      custom_attributes {
          attribute_code
          value
      }
      extension_attributes {
          attribute_code
          value
      }
      firstname
      lastname
      postcode
      country_code
      region {
          region
          region_code
      }
      street
      telephone
    }
    wishlist {
        id
        items {
            id
            product {
                ${productDetail}
                ${priceRange}
                ${priceTiers}
            }
        }
    }
    store_credit {
      current_balance {
          value
      }
      enabled
    }
    gift_card {
      giftcard_code
      giftcard_balance
    }
`;

module.exports = { customerOutput, customerOutputComplete };
