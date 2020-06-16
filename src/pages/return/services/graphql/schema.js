import { gql } from 'apollo-boost';

export const getFormDataRma = gql`
    query getNewFormDataAwRma($email: String!, $order_number: String!) {
        getNewFormDataAwRma(email: $email, order_number: $order_number) {
            allowed_file_extensions
            custom_fields {
                id
                frontend_labels {
                    store_id
                    value
                }
                is_editable
                is_required
                name
                refers
                website_ids
                options {
                    frontend_labels {
                      store_id
                      value
                    }
                    id
                  }
            }
            items {
                is_returnable
                item_id
                name
                other_rma_request
                price
                qty_returnable
                sku
                image_url
                parent_item_id
                url_key
              }
        }
    }
`;

export const requestRma = gql`
mutation createRequestAwRma (
    $order_number: String!,
    $customer_email: String!,
    $customer_name: String!,
    $custom_fields: [AwRmaCustomFieldInput]!,
    $order_items: [AwRmaOrderItemsInput]!,
    $thread_message: AwRmaThreadMessageInput
) {
    createRequestAwRma(
        input: {
            order_number: $order_number
            customer_name: $customer_name
            customer_email: $customer_email
            custom_fields: $custom_fields
            order_items: $order_items
            thread_message: $thread_message
        }
    ) {
        detail_rma {
            id
            increment_id
            order_id
            order_number
            status {
                name
                id
            }
        }
    }
}
`;

export default {
    getFormDataRma,
};
