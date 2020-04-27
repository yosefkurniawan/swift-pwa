import { gql } from 'apollo-boost';

export const getBannerSlider = gql`
    {
        getHomepageSlider {
            slider_id
            images {
                image_id
                image_url
                mobile_image_url
                thumb_image_url
            }
        }
    }
`;


export const getFeaturedProducts = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            description
            name
            url_key
            image
            title_rewrite
            meta_title
            children {
                id
                level
                name
                title_rewrite
                path
                description
                image
                image_path
                url_path
                url_key
                products {
                    items {
                        __typename
                        name
                        url_key
                        canonical_url
                        image {
                            url
                        }
                        thumbnail {
                            url
                        }
                        price_tiers {
                            discount {
                                amount_off
                                percent_off
                            }
                            final_price {
                                currency
                                value
                            }
                            quantity
                        }
                        price_range {
                            minimum_price {
                                regular_price {
                                    currency
                                    value
                                }
                                final_price {
                                    currency
                                    value
                                }
                            }
                        }
                    }
                }
            }
            children_count
        }
    }
`;


export const getCategoryList = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            description
            name
            url_key
            image
            title_rewrite
            meta_title
            children {
                id
                level
                name
                title_rewrite
                path
                description
                image
                image_path
                url_path
                url_key
            }
            children_count
        }
    }
`;

export default { getBannerSlider, getCategoryList, getFeaturedProducts };
