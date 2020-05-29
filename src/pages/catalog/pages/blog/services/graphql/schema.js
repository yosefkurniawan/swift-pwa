import { gql } from 'apollo-boost';

export const getCategory = gql``;

export const getAllPost = gql`
    {
        getBlogByFilter {
            data {
                id
                title
                canonical_category_id
                author_id
                url_key
                short_content
                publish_date
                featured_image_url
                canonical_category_id
                featured_image_alt
            }
        }
    }
`;

export const getPostById = gql`
query getBlog($id: Int, $category_id: Int) {
    getBlogByFilter(id: $id, category_id: $category_id){
      data {
        id
        title
        canonical_category_id
        author_id
        url_key
        short_content
        publish_date
        featured_image_url
        canonical_category_id
        featured_image_alt
        content
        created_at

      }
    }
  }
`;

export default {};
