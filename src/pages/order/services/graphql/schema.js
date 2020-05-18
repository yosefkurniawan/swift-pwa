import { gql } from 'apollo-boost';

export const getOrder = () => gql`
    query getCustomerOrder($pageSize: Int, $currentPage: Int) {
        customerOrders(pageSize: $pageSize, currentPage: $currentPage) {
            current_page
            page_size
            total_count
            total_pages
            items {
                id
                grand_total
                status
                status_label
                order_number
                detail {
                    customer_email
                    customer_firstname
                    grand_total
                    discount_amount
                    global_currency_code
                    state
                    status
                    subtotal
                    total_item_count
                    total_paid
                    total_qty_ordered
                    payment {
                        additional_information
                        payment_additional_info {
                            method_title
                            transaction_time
                            virtual_account
                          }
                        method
                        shipping_amount
                        shipping_captured
                    }
                    shipping_address {
                        firstname
                        email
                        street
                        city
                        region
                        country_id
                        telephone
                        postcode
                    }
                    shipping_methods {
                        shipping_description
                    }
                    items {
                        sku
                        name
                        qty_ordered
                        price
                        discount_amount
                    }
                }
            }
        }
    }
`;

export default {
    getOrder,
};
