/* eslint-disable no-unused-vars */
const requestGraph = require('../graphql-request');

const query = `
query getCustomerOrder($pageSize: Int, $currentPage: Int){
    customerOrders(pageSize: $pageSize , currentPage: $currentPage ) {
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
                    amount_paid
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
async function customerOrders(parent, args, context) {
    const { currentPage, pageSize } = args;
    const res = await requestGraph(query, { currentPage, pageSize }, context);
    if (res.customerOrders && res.customerOrders) {
        return res.customerOrders;
    }
    return null;
}

module.exports = customerOrders;
