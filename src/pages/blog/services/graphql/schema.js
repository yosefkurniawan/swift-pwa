import { gql } from 'apollo-boost';

const itemBlog = `
    id
    author_id
    title
    blog_post_url
    category_ids
    short_content
    url_key
    created_at
    updated_at
    customer_groups
    tag_names
    status
    publish_date
    featured_image_url
    meta_twitter_site
`;

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
    query getAllBlog(
        $page_size: Int,
        $current_page: Int,
        $category_id: Int,

    ){
        getBlogByFilter(
            page_size: $page_size,
            current_page: $current_page,
            filters: {
                category_id: $category_id,
            }
        ) {
            page_size,
            total_count
            total_pages
            current_page
            items {
             ${itemBlog}
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
                author_id
                url_key
                short_content
                publish_date
                featured_image_url
                featured_image_alt
                content
                created_at
            }
        }
    }
`;

export default {};
