/* eslint-disable import/prefer-default-export */

import { gql } from 'apollo-boost';

/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

export const getProduct = (url) => {
    const productDetail = `
    name
    sku
    stock_status
    url_key
    thumbnail {
      label
      url
    }
    `;
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
              description {
                html
              }
              short_description {
                html
              }
              image {
                label
                url
              }
              activity
              attribute_set_id
              canonical_url
              category_gear
              climate
              collar
              color
              country_of_manufacture
              format
              gender
              features_bags
              url_suffix
              url_rewrites { url, parameters { name, value}}
              swatch_image
              style_bags
              style_bottom
              style_general
              strap_bags
              special_to_date
              special_price
              special_to_date
              upsell_products {
                ${productDetail}
              }
              media_gallery {
                label,
                url
              }
              related_products {
               ${productDetail}
              }
              
            }
            total_count
          }
    }`;
    return query;
};

export const getReview = (params) => {
    const { sku, pageSize, currentPage } = params;
    const query = gql`
  {
    getProductReviews(sku: "${sku}", pageSize:${pageSize}, currentPage:${currentPage}) {
      items {
        id
        nickname
        ratings {
          rating_name
          value
        }
        review_entity
        review_type
        review_status
        title
        detail
        created_at
      }
      message
      totalCount
    }
  }
  `;
    return query;
};
