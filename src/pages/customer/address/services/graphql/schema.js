/* eslint-disable import/prefer-default-export */

import { gql } from 'apollo-boost';

export const getCountries = gql`
  {
    countries {
      id
      full_name_locale
      full_name_english
    }
  }
`;
