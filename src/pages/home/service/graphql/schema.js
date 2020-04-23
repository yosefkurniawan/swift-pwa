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

export const getCategoryList = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            id
            name
            url_key
            image
            products {
                items {
                    name
                    url_path
                    url_key
                    image {
                        url
                    }
                    thumbnail {
                        url
                    }
                    price_range {
                        minimum_price {
                            regular_price {
                                value
                            }
                        }
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
                }
            }
            children {
                id
                name
                description
                url_key
                url_path
                image
            }
        }
    }
`;

export default { getBannerSlider, getCategoryList };
