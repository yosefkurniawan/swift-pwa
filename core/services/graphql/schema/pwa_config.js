import { gql } from '@apollo/client';

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

export default {
    contactConfig,
};
