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
                custom_attributes {
                    attribute_code
                    value
                }
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

export const getCart = gql`
    query Cart($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            email
            prices {
                grand_total {
                    value
                    currency
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
                        currency
                    }
                }
                selected_shipping_method {
                    method_code
                    carrier_code
                    amount {
                        value
                        currency
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
                        value
                        currency
                    }
                    label
                }
                subtotal_excluding_tax {
                    value
                    currency
                }
                grand_total {
                    value
                    currency
                }
            }
        }
    }
`;

export const setShippingAddressById = gql`
    mutation setShippingAddressById($addressId: Int!, $cartId: String!) {
        setShippingAddressesOnCart(input: { cart_id: $cartId, shipping_addresses: { customer_address_id: $addressId } }) {
            cart {
                id
                email
                items {
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
                            value
                            currency
                        }
                        label
                    }
                    grand_total {
                        value
                        currency
                    }
                }
                shipping_addresses {
                    firstname
                    lastname
                    street
                    city
                    postcode
                    telephone
                    region {
                        label
                    }
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
                    selected_shipping_method {
                        amount {
                            value
                            currency
                        }
                    }
                }
                applied_coupons {
                    code
                }
                billing_address {
                    country {
                        code
                        label
                    }
                }
                selected_payment_method {
                    code
                }
            }
        }
    }
`;

export const setShippingAddressByInput = gql`
    mutation setShippingAddressByInput(
        $cartId: String!
        $city: String!
        $countryCode: String!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
    ) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: {
                    address: {
                        city: $city
                        country_code: $countryCode
                        firstname: $firstname
                        lastname: $lastname
                        telephone: $telephone
                        region: $region
                        street: [$street]
                        postcode: $postcode
                        save_in_address_book: true
                    }
                }
            }
        ) {
            cart {
                id
                email
                items {
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
                            value
                            currency
                        }
                        label
                    }
                    grand_total {
                        value
                        currency
                    }
                }
                shipping_addresses {
                    firstname
                    lastname
                    street
                    city
                    country {
                        code
                        label
                    }
                    postcode
                    telephone
                    region {
                        label
                    }
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
                    selected_shipping_method {
                        amount {
                            value
                            currency
                        }
                    }
                }
                applied_coupons {
                    code
                }
                billing_address {
                    country {
                        code
                        label
                    }
                }
                selected_payment_method {
                    code
                }
            }
        }
    }
`;

export const setShippingMethod = gql`
    mutation setShippingMethod($cartId: String!, $carrierCode: String!, $methodCode: String!) {
        setShippingMethodsOnCart(input: { cart_id: $cartId, shipping_methods: { carrier_code: $carrierCode, method_code: $methodCode } }) {
            cart {
                id
                email
                available_payment_methods {
                    code
                    title
                }
                shipping_addresses {
                    selected_shipping_method {
                        amount {
                            value
                            currency
                        }
                    }
                }
                applied_coupons {
                    code
                }
                billing_address {
                    country {
                        code
                        label
                    }
                }
                selected_payment_method {
                    code
                }
                items {
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
                            value
                            currency
                        }
                        label
                    }
                    grand_total {
                        value
                        currency
                    }
                }
            }
        }
    }
`;

export const setBillingAddressById = gql`
    mutation setBillingAddressById($addressId: Int!, $cartId: String!) {
        setBillingAddressOnCart(input: { cart_id: $cartId, billing_address: { same_as_shipping: true, customer_address_id: $addressId } }) {
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

export const setBillingAddressByInput = gql`
    mutation setBillingAddressByInput(
        $cartId: String!
        $city: String!
        $countryCode: String!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
    ) {
        setBillingAddressOnCart(
            input: {
                cart_id: $cartId
                billing_address: {
                    same_as_shipping: true
                    address: {
                        city: $city
                        country_code: $countryCode
                        firstname: $firstname
                        lastname: $lastname
                        telephone: $telephone
                        region: $region
                        street: [$street]
                        postcode: $postcode
                        save_in_address_book: true
                    }
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
        setPaymentMethodOnCart(input: { cart_id: $cartId, payment_method: { code: $code } }) {
            cart {
                id
                email
                shipping_addresses {
                    selected_shipping_method {
                        amount {
                            value
                            currency
                        }
                    }
                }
                applied_coupons {
                    code
                }
                billing_address {
                    country {
                        code
                        label
                    }
                }
                selected_payment_method {
                    code
                }
            }
        }
    }
`;

export const setGuestEmailAddressOnCart = gql`
    mutation($cartId: String!, $email: String!) {
        setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
            cart {
                email
                shipping_addresses {
                    selected_shipping_method {
                        amount {
                            value
                            currency
                        }
                    }
                }
                applied_coupons {
                    code
                }
                billing_address {
                    country {
                        code
                        label
                    }
                }
                selected_payment_method {
                    code
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

export const applyCouponToCart = gql`
    mutation($cartId: String!, $coupon: String!) {
        applyCouponToCart(input: { cart_id: $cartId, coupon_code: $coupon }) {
            cart {
                items {
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
                applied_coupons {
                    code
                }
                shipping_addresses {
                    selected_shipping_method {
                        amount {
                            value
                            currency
                        }
                    }
                }
                prices {
                    discounts {
                        amount {
                            value
                            currency
                        }
                        label
                    }
                    subtotal_excluding_tax {
                        value
                        currency
                    }
                    grand_total {
                        value
                        currency
                    }
                }
            }
        }
    }
`;

export const removeCouponFromCart = gql`
    mutation($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId }) {
            cart {
                items {
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
                applied_coupons {
                    code
                }
                shipping_addresses {
                    selected_shipping_method {
                        amount {
                            value
                            currency
                        }
                    }
                }
                items {
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
                            value
                            currency
                        }
                        label
                    }
                    subtotal_excluding_tax {
                        value
                        currency
                    }
                    grand_total {
                        value
                        currency
                    }
                }
            }
        }
    }
`;

export const getSnapToken = gql`
    query($orderId: String!) {
        getSnapTokenByOrderId(
            order_id: $orderId
        ) {
            snap_token
        }
    }
`;

export const getSnapOrderStatusByOrderId = gql`
    query($orderId: String!) {
        getSnapOrderStatusByOrderId(
            order_id: $orderId
        ) {
            order_id
            status_message
            success
        }
    }
`;
