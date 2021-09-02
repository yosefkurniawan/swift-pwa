import { gql } from '@apollo/client';

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

export default {
    shareIconConfig,
};
