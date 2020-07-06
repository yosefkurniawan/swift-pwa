import { gql } from 'apollo-boost';

export const addWishlist = gql`
    mutation addWishlist($productId: Int!) {
        addProductToWishlist(productId: $productId) {
            info
        }
    }
`;

export const removeWishlist = gql`
    mutation removeWishlist($wishlistItemId: Int!) {
        removeItemWishlist(wishlistItemId: $wishlistItemId) {
            info
        }
    }
`;

const productDetail = `
    id
    name
    sku
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url
    }
    image{
      url
    }
    review {
      rating_summary
      reviews_count
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

export const getCustomer = gql`
{
    customer {
      id
      firstname
      lastname
      email
      is_subscribed
      phonenumber
      whatsapp_number
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
    }
  }
`;

export const getRewardPoint = gql`
query getRewardPoint(
  $pageSize: Int,
  $currentPage: Int
) {
  customerRewardPoints {
    balance
    balanceCurrency
    formatedBalanceCurrency
    formatedSpendRate
    spendRate
    transaction_history(pageSize: $pageSize, currentPage: $currentPage) {
      items {
        transactionId
        balance
        comment
        expirationDate
        points
        transactionDate
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
}
`;

export default {
    addWishlist,
    getCustomer,
};
