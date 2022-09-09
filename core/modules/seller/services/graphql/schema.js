import { gql } from '@apollo/client';

export const getSeller = gql`
    query getSeller($sellerId: [Int!]) {
        getSeller(input: { seller_id: $sellerId }) {
            additional_info
            address
            city
            description
            id
            latitude
            logo
            longitude
            name
            status
        }
    }
`;

export const getProductBySellerId = gql`
    query getProductBySellerId($filter: ProductAttributeFilterInput) {
        products(filter: $filter) {
            items {
                id
                name
                url_key
                small_image {
                    url
                    label
                }
                price_range {
                    maximum_price {
                        discount {
                            amount_off
                            percent_off
                        }
                        final_price {
                            currency
                            value
                        }
                        fixed_product_taxes {
                            amount {
                                currency
                                value
                            }
                            label
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                    minimum_price {
                        discount {
                            amount_off
                            percent_off
                        }
                        final_price {
                            currency
                            value
                        }
                        fixed_product_taxes {
                            amount {
                                currency
                                value
                            }
                            label
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getSeller,
    getProductBySellerId,
};
