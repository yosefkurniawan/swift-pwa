import { gql } from '@apollo/client';
import { modules } from '@config';

export const getGroupedProduct = gql`
    query getGroupedProduct($sku: String!) {
        products(search: "", filter: { sku: { eq: $sku } }) {
            items {
                __typename
                ... on GroupedProduct {
                    items {
                        qty
                        position
                        product {
                            id
                            name
                            sku
                            ${modules.catalog.productListing.label.sale.enabled ? 'sale' : ''}
                            stock_status
                            special_from_date
                            special_to_date
                            price_range {
                                minimum_price {
                                    discount {
                                        amount_off
                                        percent_off
                                        __typename
                                    }
                                    final_price {
                                        currency
                                        value
                                        __typename
                                    }
                                    fixed_product_taxes {
                                        amount {
                                            currency
                                            value
                                            __typename
                                        }
                                        label
                                        __typename
                                    }
                                    regular_price {
                                        currency
                                        value
                                        __typename
                                    }
                                    __typename
                                }
                                maximum_price {
                                    discount {
                                        amount_off
                                        percent_off
                                        __typename
                                    }
                                    final_price {
                                        currency
                                        value
                                        __typename
                                    }
                                    fixed_product_taxes {
                                        amount {
                                            currency
                                            value
                                            __typename
                                        }
                                        label
                                        __typename
                                    }
                                    regular_price {
                                        currency
                                        value
                                        __typename
                                    }
                                    __typename
                                }
                                __typename
                            }
                            price_tiers {
                                discount {
                                    amount_off
                                    percent_off
                                    __typename
                                }
                                final_price {
                                    currency
                                    value
                                    __typename
                                }
                                quantity
                                __typename
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getGroupedProduct,
};
