import { gql } from '@apollo/client';

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
    popupInstallConfig,
};
