import { gql } from 'apollo-boost';

export const categories = gql`
  {
    categoryList {
      children_count
      children {
        id
        level
        name
        path
        url_path
        url_key
        include_in_menu
        children {
          id
          level
          name
          path
          url_path
          url_key
          children {
            id
            level
            name
            path
            url_path
            url_key
          }
        }
      }
    }
  }
`;
