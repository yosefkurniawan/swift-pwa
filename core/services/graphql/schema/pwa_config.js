import { gql } from '@apollo/client';

export const vesMenuConfig = gql`
{
    storeConfig {
      pwa {
        ves_menu_enable
        ves_menu_alias
      }
    }
  }
`;

export const popupInstallConfig = gql`
{
    storeConfig {
      pwa {        
        app_name
        icon_apple_touch
        custom_install_app_enable
        install_message
      }
    }
  }
`;

export const shareIconConfig = gql`
{
    storeConfig {
      pwa {
        share_icon_line
        share_icon_email
        share_icon_twitter
        share_icon_facebook
        share_icon_linkedin
        share_icon_telegram
      }
    }
  }
`;

export const getRemoveDecimalConfig = `
{
    storeConfig {
      pwa {        
        remove_decimal_price_enable
      }
    }
  }
`;

export const contactConfig = gql`
{
    storeConfig {
      pwa {
          cms_contact_identifiers
          recaptcha_contact_enable
      }
    }
}
`;

export const popupDetailImagePdp = gql`
{
  storeConfig {
    pwa {
      popup_detail_image_enable
      
    }
  }
}
`;

export default {
    vesMenuConfig,
    popupInstallConfig,
    shareIconConfig,
    contactConfig,
    getRemoveDecimalConfig,
};
