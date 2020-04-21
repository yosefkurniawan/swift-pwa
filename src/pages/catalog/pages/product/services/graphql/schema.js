/* eslint-disable import/prefer-default-export */

import { gql } from 'apollo-boost';

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
              name
              sku
              stock_status
              url_key
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
              thumbnail {
                label
                url
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
                id
                name
                thumbnail {
                  url
                }
              }
              media_gallery {
                label,
                url
              }
              related_products {
                id
                name
                thumbnail {
                  url
                }
                url_key
              }
              
            }
            total_count
          }
    }`;
    return query;
};
