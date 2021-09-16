import { gql } from '@apollo/client';

export const getCmsPage = gql`
    query($identifier: String!) {
        cmsPage(identifier: $identifier) {
            identifier
            content
            meta_description
            meta_keywords
            title
            url_key
        }
    }
`;

export const getInstagramToken = gql`
{
    instagramToken {
      token
    }
}
`;

export const getPageBuilderTemplate = gql`
query($identifier: String!){
    getPageBuilderTemplate(id: $identifier){
        data
    }
}
`;

export const getInstagramFeed = gql`
mutation getInstagramFeed($token: String!) {
    internalGetInstagramFeed(token: $token) {
        message
        data {
            id
            media_type
            media_url
            permalink
            caption
            username
        }
        err
    }
}
`;

export const getCmsBlocks = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getCategories = gql`
    query getCategories($ids: [String]) {
        categoryList(filters: { ids: { in: $ids } }) {
            name
            product_count
            url_path
            children {
                name
                product_count
                url_path
                children {
                    name
                    product_count
                    url_path
                    children {
                        name
                        product_count
                        url_path
                        children {
                            name
                            product_count
                            url_path
                        }
                    }
                }
            }
        }
    }
`;

export default { getCmsPage };
