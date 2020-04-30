import { gql } from 'apollo-boost';

export const getCustomer = gql`
    query {
        customer {
            firstname
            lastname
            email
            addresses {
                id
                city
                default_billing
                default_shipping
                extension_attributes {
                    attribute_code
                    value
                }
                firstname
                lastname
                postcode
                country_code
                region {
                    region
                    region_code
                }
                street
                telephone
            }
        }
    }
`;

export const getCustomerCart = gql`
    query {
        customerCart {
            id
            prices {
                grand_total {
                    value
                }
            }
            applied_coupons {
                code
            }
            items {
                id
                product {
                    name
                    image {
                        url
                        label
                    }
                }
                prices {
                    row_total {
                        currency
                        value
                    }
                    discounts {
                        amount {
                            currency
                            value
                        }
                        label
                    }
                }
            }
            billing_address {
                city
                company
                country {
                    code
                    label
                }
                firstname
                lastname
                postcode
                region {
                    code
                    label
                }
                street
                telephone
            }
            shipping_addresses {
                city
                company
                country {
                    code
                    label
                }
                firstname
                lastname
                postcode
                region {
                    code
                    label
                }
                street
                telephone
                available_shipping_methods {
                    available
                    method_code
                    carrier_code
                    method_title
                    carrier_title
                    amount {
                        value
                    }
                }
                selected_shipping_method {
                    method_code
                    carrier_code
                    amount {
                        value
                    }
                }
            }
            selected_payment_method {
                code
            }
            available_payment_methods {
                code
                title
            }
            prices {
                discounts {
                    amount {
                        currency
                        value
                    }
                    label
                }
                grand_total {
                    currency
                    value
                }
            }
        }
    }
`;

export const setShippingAddressById = gql`
    mutation setShippingAddressById($addressId: Int!, $cartId: String!) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: { customer_address_id: $addressId }
            }
        ) {
            cart {
                id
                shipping_addresses {
                    available_shipping_methods {
                        amount {
                            currency
                            value
                        }
                        available
                        carrier_code
                        carrier_title
                        error_message
                        method_code
                        method_title
                    }
                }
            }
        }
    }
`;

export const setShippingAddressByInput = gql`
    mutation setShippingAddressByInput($address: Object!, $cartId: String!) {
        setShippingAddressesOnCart(
            input: { cart_id: $cartId, shipping_addresses: $address }
        ) {
            cart {
                id
                shipping_addresses {
                    available_shipping_methods {
                        amount {
                            currency
                            value
                        }
                        available
                        carrier_code
                        carrier_title
                        error_message
                        method_code
                        method_title
                    }
                }
            }
        }
    }
`;

export const setShippingMethod = gql`
    mutation setShippingMethod(
        $cartId: String!
        $carrierCode: String!
        $methodCode: String!
    ) {
        setShippingMethodsOnCart(
            input: {
                cart_id: $cartId
                shipping_methods: {
                    carrier_code: $carrierCode
                    method_code: $methodCode
                }
            }
        ) {
            cart {
                id
                available_payment_methods {
                    code
                    title
                }
                shipping_addresses {
                    selected_shipping_method {
                        amount {
                            value
                        }
                    }
                }
                prices {
                    discounts {
                        amount {
                            currency
                            value
                        }
                        label
                    }
                    grand_total {
                        currency
                        value
                    }
                }
            }
        }
    }
`;

export const setBillingAddressById = gql`
    mutation setBillingAddressById($addressId: Int!, $cartId: String!) {
        setBillingAddressOnCart(
            input: {
                cart_id: $cartId
                billing_address: {
                    same_as_shipping: true
                    customer_address_id: $addressId
                }
            }
        ) {
            cart {
                selected_payment_method {
                    code
                    title
                }
                shipping_addresses {
                    selected_shipping_method {
                        carrier_code
                        carrier_title
                    }
                }
            }
        }
    }
`;

export const setPaymentMethod = gql`
    mutation setPaymentMethod($cartId: String!, $code: String!) {
        setPaymentMethodOnCart(
            input: { cart_id: $cartId, payment_method: { code: $code } }
        ) {
            cart {
                applied_coupons {
                    code
                }
                billing_address {
                    city
                    country {
                        code
                        label
                    }
                    firstname
                    lastname
                    postcode
                    region {
                        code
                        label
                    }
                    street
                    telephone
                }
                shipping_addresses {
                    selected_shipping_method {
                        carrier_code
                        method_code
                    }
                }
                selected_payment_method {
                    code
                }
                items {
                    id
                    product {
                        name
                        image {
                            url
                            label
                        }
                    }
                    prices {
                        row_total {
                            currency
                            value
                        }
                        discounts {
                            amount {
                                currency
                                value
                            }
                            label
                        }
                    }
                }
                prices {
                    discounts {
                        amount {
                            currency
                            value
                        }
                        label
                    }
                    grand_total {
                        currency
                        value
                    }
                }
            }
        }
    }
`;

export const placeOrder = gql`
    mutation($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) {
            order {
                order_number
            }
        }
    }
`;
