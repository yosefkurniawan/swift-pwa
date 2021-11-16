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

export default {
    vesMenuConfig,
    popupInstallConfig,
};
