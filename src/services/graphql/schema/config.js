/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export default gql`
  {
    storeConfig {
      secure_base_media_url
      secure_base_static_url
      base_media_url
      base_static_url
      base_url
      base_currency_code
      code
      copyright
      catalog_default_sort_by
      default_title
      default_keywords
      default_description
      default_display_currency_code
      header_logo_src
      head_shortcut_icon
      logo_alt
      logo_width
      logo_height
      store_name
      welcome
      timezone
      title_prefix
      title_suffix
      title_separator
      website_id
      weight_unit
    }
  }
`;
