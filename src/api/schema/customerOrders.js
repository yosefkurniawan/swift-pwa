const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const { gql } = require('apollo-server-express');

const orderSchemar = makeExecutableSchema({
    typeDefs: gql`
        type ShippingMethods {
            shipping_description: String
        }

        type OrderAddress {
            city: String
            country_id: String
            email: String
            firstname: String
            lastname: String
            postcode: String
            region: String
            street: String
            telephone: String
        }
        type PaymentAdditionalInfo {
            due_date: String
            method_title: String
            transaction_id: String
            transaction_time: String
            virtual_account: String
        }
        type OrderDetailPayment {
            additional_information: [String]
            method: String
            payment_additional_info: PaymentAdditionalInfo
            shipping_amount: Int
            shipping_captured: Int
        }
        type OrderDetailItem {
            amount_refunded: Int
            discount_amount: Float
            discount_percent: Float
            name: String
            price: Float
            price_incl_tax: Float
            qty_canceled: Int
            qty_ordered: Int
            qty_refunded: Int
            qty_shipped: Int
            row_total: Int
            row_total_incl_tax: Int
            row_weight: Float
            sku: String
            tax_amount: Int
            tax_percent: Int
        }

        type CustomerOrderDetail {
            billing_address: OrderAddress
            customer_email: String
            customer_firstname: String
            customer_lastname: String
            discount_amount: Float
            global_currency_code: String
            grand_total: Float
            items: [OrderDetailItem]
            payment: OrderDetailPayment
            shipping_address: OrderAddress
            shipping_methods: ShippingMethods
            state: String
            status: String
            subtotal: Float
            subtotal_incl_tax: Float
            tax_amount: Float
            total_item_count: Float
            total_paid: Float
            total_qty_ordered: Float
            weight: Float
        }
        type CustomerOrder {
            created_at: String
            detail: [CustomerOrderDetail]
            grand_total: Float
            id: Int
            order_number: String!
            status: String
            status_label: String
            increment_id: String
        }
        type CustomerOrders {
            current_page: Int
            items: [CustomerOrder]
            page_size: Int
            total_count: Int
            total_pages: Int
        }

        type Query {
            customerOrders(pageSize: Int, currentPage: Int): CustomerOrders!
        }
    `,
});

addMockFunctionsToSchema({ schema: orderSchemar });

module.exports = orderSchemar;
