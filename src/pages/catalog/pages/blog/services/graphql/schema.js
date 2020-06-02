import { gql } from 'apollo-boost';

export const getCategory = gql`
    {
        getBlogCategory {
            data {
                name
                description
                id
                image_alt
                image_file_name
                image_title
                is_description_enabled
                url_key
                path
                parent_id
                meta_description
                meta_keywords
                meta_prefix
                meta_title
                sort_order
                status
                created_at
                updated_at
            }
        }
    }
`;

export const getAllPost = gql`
    query getAllBlog($category_id: Int){
        getBlogByFilter(category_id: $category_id) {
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
    query getBlog($id: Int) {
        getBlogByFilter(id: $id) {
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
