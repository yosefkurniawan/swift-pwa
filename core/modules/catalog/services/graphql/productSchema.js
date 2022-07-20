/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client';
import { modules } from '@config';
import { useRouter } from '@root/node_modules/next/router';

/**
 * generate dynamic filter query
 * @param catId number
 * @param filter array of filter value
 * @returns string query to generate on grapql tag
 */

const filterProduct = (filter) => {
    const router = useRouter();

    let queryFilter = '{ ';
    if (router.asPath.includes('color')) {
        const routerPaths = router.asPath.split('?');
        const routerPathsNext = routerPaths[1].split('&');
        const routerPathsColor = routerPathsNext[0].split('=');

        queryFilter += `color: {
        eq: "${routerPathsColor[1]}"
      }`;
    }
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < filter.length; index++) {
        const detailFilter = filter[index];
        if (detailFilter.type === 'price') {
            queryFilter += `
          ,${detailFilter.type} : {
            from: "${detailFilter.from}"
            to: "${detailFilter.to}"
          }
        `;
        } else if (typeof detailFilter.value === 'object') {
            let inFilter = '';
            // eslint-disable-next-line no-plusplus
            for (let idx = 0; idx < detailFilter.value.length; idx++) {
                inFilter += `${idx !== 0 ? ',' : ''}"${detailFilter.value[idx]}"`;
            }
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                in: [${inFilter}]
              }`;
        } else {
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                  eq: "${detailFilter.value}"
                }`;
        }
    }
    queryFilter += '}';

    return queryFilter;
};

export const getProductAgragations = () => gql`
    {
        products(search: "") {
            aggregations {
                attribute_code
            }
        }
    }
`;

/**
 * scema dynamic product
 * @param catId number
 * @param config Object {pageSize: number, currentPage: Number}
 * @returns grapql query
 */

export const getProduct = (config = {}) => gql`
  query getProducts(
    $pageSize: Int,
    $currentPage: Int,
  ){
  products( search: "${config.search}" ,filter: ${filterProduct(config.filter)},
  pageSize: $pageSize,
  currentPage: $currentPage
  ${config.sort && config.sort.key && config.sort.key !== 'position' ? `, sort: {${config.sort.key} : ${config.sort.value}}` : ''}
    ) {
      page_info {
        current_page
       page_size
       total_pages
     }
      total_count
      ${
    !config.customFilter
        ? `aggregations {
        attribute_code
        label
        options {
          count
          label
          value
        }
      }`
        : ''
}
      __typename
      items {
        id
        sku
        name
        url_key
        stock_status
        short_description {
          html
        }
        ${
    config.label_weltpixel_enable
        ? `
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
        `
        : ''
}
        ${
    config.configurable_options_enable
        ? `review {
          rating_summary
          reviews_count
        }`
        : ''
}
        small_image {
          url,
          label
        }
        categories {
          name
        }
        __typename
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
            discount{
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
            discount{
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

        special_from_date
        special_to_date
        new_from_date
        new_to_date
        ${config.label_sale_enable ? 'sale' : ''}
        ${
    config.configurable_options_enable
        ? `
        ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_id
            label
            attribute_code
            values {
              value_index
              label
              swatch_data {
                value
                ... on ImageSwatchData {
                  thumbnail
                  value
                }
                ... on ColorSwatchData {
                  value
                }
                ... on TextSwatchData {
                  value
                }
              }
            }
            product_id
          }
          variants {
            attributes {
              code
              label
              value_index
            }
            product {
              id
              sku
              stock_status
              url_key
              ${
    config.rating_enable
        ? `review {
                rating_summary
                reviews_count
              }`
        : ''
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
              special_from_date
              special_to_date
              new_from_date
              new_to_date
              ${config.label_sale_enable ? 'sale' : ''}
              small_image{
                url,
                label
              }
              image {
                url
                label
              }
            }
          }
        }
        `
        : ''
}
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

const productDetail = (config = {}) => `
    id
    name
    sku
    short_description {
      html
    }
    ${config.label_sale_enable ? 'sale' : ''}
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url,
      label
    }
    image{
      url
    }
    review {
      rating_summary
      reviews_count
    }
    categories {
      id
      name
      url_path
      breadcrumbs {
        category_id
        category_url_path
        category_name
      }
    }
    special_from_date
    special_to_date

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

export const getDetailProduct = (config = {}) => gql`
query getDetailproduct($url_key: String!){
  products(
      search: "" ,filter: {
        url_key: {
          eq: $url_key
        }
      }
    ) {
      items {
        ${
    modules.product.customizableOptions.enabled
        ? `
        ... on CustomizableProductInterface {
          options {
            title
            option_id
            required
            sort_order
            __typename
          }
        }
        `
        : ''
}
        ${productDetail(config)}
        ${priceRange}
        ${priceTiers}
        ${modules.brands.enabled ? 'brand' : ''}
        short_description {
          html
        }
        media_gallery {
          label,
          url
        }
      }
      total_count
    }
}`;
