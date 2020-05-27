const cartOutput = `
    id
    email
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
    selected_payment_method {
        code
    }
    applied_coupons {
        code
    }
    shipping_addresses {
        selected_shipping_method {
            method_code
            carrier_code
            amount {
                value
                currency
            }
        }
        firstname
        lastname
        street
        city
        postcode
        telephone
        region {
            code
            label
        }
        company
        country {
            code
            label
        }
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
    items {
        quantity
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
            price {
                value
                currency
            }
        }
        product {
            id
            name
            categories {
            name
            }
            url_key
            sku
            stock_status
        }
    }
    available_payment_methods {
        code
        title
    }
    applied_store_credit {
        store_credit_amount
        is_use_store_credit
    }
    applied_giftcard {
        giftcard_amount
        giftcard_detail {
            giftcard_amount_used
            giftcard_code
        }
    }
`;

module.exports = cartOutput;
