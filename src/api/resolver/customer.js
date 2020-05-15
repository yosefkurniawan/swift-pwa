/* eslint-disable no-unused-vars */
const requestGraph = require('../graphql-request');

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

const query = `
{
    customer {
     firstname
     lastname
     email
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
async function customer(parent, args, context) {
    const res = await requestGraph(query, {}, context);
    if (res && res.customer) {
        return res.customer;
    }
    return res;
}

module.exports = customer;
