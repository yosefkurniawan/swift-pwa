/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client';

/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

export const getResolver = (url) => {
    const query = gql`{
      urlResolver(url: "${url}") {
        id
        redirectCode
        relative_url
        type
      }
    }
  `;
    return query;
};

export const slugPageSchema = `
{
    storeConfig {
      pwa {
        page_size
        drawer_filter_on_desktop_enable
        label_enable
        label_new_enable
        label_sale_enable
        label_weltpixel_enable
        configurable_options_enable
        rating_enable
        add_to_cart_enable
        quick_view_enable
      }
    }
  }
`;
