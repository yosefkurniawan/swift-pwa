/* eslint-disable import/prefer-default-export */
import { productImageSize } from '@config';
import { gql } from 'apollo-boost';

const productDetail = `
    id
    name
    sku
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url(width: ${productImageSize.width}, height: ${productImageSize.height}),
      label
    }
    image{
      url
    }
    categories {
      name
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

/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

export const getProduct = (url) => {
    const query = gql`{
        products(
            search: "" ,filter: {
              url_key: {
                eq: "${url}"
              }
            }
          ) {
            items {
              ${productDetail}
              ${priceRange}
              ${priceTiers}
              description {
                html
              }
              categories {
                id
                name
              }
              short_description {
                html
              }
              more_info {
                label
                value
              }
              upsell_products {
                ${productDetail}
                ${priceRange}
                ${priceTiers}
              }
              media_gallery {
                label,
                url
              }
              related_products {
               ${productDetail}
               ${priceRange}
               ${priceTiers}
              }
            }
            total_count
          }
    }`;
    return query;
};

export const getConfigurableProduct = (sku) => {
    const query = gql`{
      products(
        search: "" ,filter: {
          sku: {
            eq: "${sku}"
          }
        }
      ) {
        items {
          ... on ConfigurableProduct {
            configurable_options {
              id
              attribute_id
              label
              position
              use_default
              attribute_code
              values {
                value_index
                label
              }
              product_id
            }
            variants {
              product {
                ${productDetail}
                ${priceRange}
                ${priceTiers}
                media_gallery {
                  label,
                  url
                }
              }
              attributes {
                label
                code
                value_index
              }
            }
          }
        }
      }
    }`;
    return query;
};
