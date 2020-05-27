const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const { gql } = require('apollo-server-express');
const product = require('./product');
const country = require('./types/countryCodeEnum');

const customerSchema = makeExecutableSchema({
    typeDefs: gql`
        ${country}
        ${product}
        type WishlistItem {
            added_at: String
            description: String
            id: Int
            product: ProductInterface
            qty: Float
        }
        type Wishlist {
            id: ID
            items: [WishlistItem]
            items_count: Int
            sharing_code: String
            updated_at: String
        }
        type CustomerAddressAttribute {
            attribute_code: String
            value: String
        }
        type CustomerAddressRegion {
            region: String
            region_code: String
            region_id: Int
        }
        type CustomerStoreCredit {
            current_balance: Money
            enabled: Boolean
            transaction_history(
              pageSize: Int
              currentPage: Int = 1
            ): CustomerStoreCreditHistory
        }
        type CustomerStoreCreditHistory {
            items: [CustomerStoreCreditHistoryItem]
            page_info: SearchResultPageInfo
            total_count: Int
        }
        type CustomerStoreCreditHistoryItem {
            comment: String
            comment_placeholder: String
            store_credit_adjustment: Money
            store_credit_balance: Money
            transaction_date_time: String
            transaction_id: String
        }
        type SearchResultPageInfo {
            current_page: Int
            page_size: Int
            total_pages: Int
          }

        type CustomerAddress {
            city: String
            company: String
            country_code: CountryCodeEnum
            default_billing: Boolean
            default_shipping: Boolean
            extension_attributes: [CustomerAddressAttribute]
            fax: String
            firstname: String
            id: Int
            lastname: String
            middlename: String
            postcode: String
            prefix: String
            region: CustomerAddressRegion
            street: [String]
            suffix: String
            telephone: String
            vat_id: String
            country_id: String
            custom_attributes: [CustomerAddressAttribute]
            customer_id: Int
            region_id: Int
        }
<<<<<<< HEAD
        type CustomerGiftCard {
            giftcard_balance: Float
            giftcard_code: String
        }
=======

        type CustomerStoreCreditHistoryItem {
            comment: String
            comment_placeholder: String
            store_credit_adjustment: Money
            store_credit_balance: Money
            transaction_date_time: String
            transaction_id: String
        }

        type CustomerStoreCreditHistory {
            items: [CustomerStoreCreditHistoryItem]
            page_info: SearchResultPageInfo
            total_count: Int
        }

        type SearchResultPageInfo {
            current_page: Int
            page_size: Int
            total_pages: Int
        }

        type CustomerStoreCredit {
            current_balance: Money
            enabled: Boolean
            transaction_history: CustomerStoreCreditHistory
        }

>>>>>>> add store credits schema on internal request
        type Customer {
            addresses: [CustomerAddress]
            created_at: String
            store_credit:CustomerStoreCredit,
            date_of_birth: String
            default_billing: String
            default_shipping: String
            email: String
            firstname: String
            gender: Int
            is_subscribed: Boolean
            lastname: String
            middlename: String
            prefix: String
            suffix: String
            taxvat: String
            wishlist: Wishlist!
            dob: String
            group_id: Int
            id: Int
            store_credit: CustomerStoreCredit
            gift_card: [CustomerGiftCard]
        }

        type AddProductToWishlistOutput {
            info: String
        }

        type RemoveItemWishlistOutput {
            info: String
        }

        input UpdateCustomerInput {
            date_of_birth: String
            dob: String
            email: String
            firstname: String
            gender: Int
            is_subscribed: Boolean
            lastname: String
            middlename: String
            password: String
            prefix: String
            suffix: String
            taxvat: String
        }
        
        type UpdateCustomerOutput {
            customer: Customer
        }

        type Query {
            customer (
                pageSizeStoreCredit: Int = 10
                currentPageStoreCredit: Int = 1
            ): Customer
        }

        input CustomerAddressRegionInput {
            region: String
            region_code: String
            region_id: Int
        }

        input CustomerAddressAttributeInput {
            attribute_code: String!
            value: Float!
        }

        input CustomerAddressInput {
            city: String
            company: String
            country_code: CountryCodeEnum
            country_id: CountryCodeEnum
            fax: String
            firstname: String
            lastname: String
            middlename: String
            default_billing: Boolean
            default_shipping: Boolean
            postcode: String
            street: [String]
            prefix: String
            suffix: String
            telephone: String
            vat_id: String
            custom_attributes: [CustomerAddressAttributeInput]
            region: CustomerAddressRegionInput
        }

        type Mutation {
            updateCustomer(input: UpdateCustomerInput): UpdateCustomerOutput
            changeCustomerPassword(currentPassword: String!, newPassword: String!): Customer
            addProductToWishlist(productId: Int!): AddProductToWishlistOutput
            removeItemWishlist(wishlistItemId: Int!): RemoveItemWishlistOutput
            createCustomerAddress(input: CustomerAddressInput) : CustomerAddress
            updateCustomerAddress(id: Int!, input: CustomerAddressInput) : CustomerAddress
        }
    `,
});

addMockFunctionsToSchema({ schema: customerSchema });

module.exports = customerSchema;
