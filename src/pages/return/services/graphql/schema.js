import { gql } from 'apollo-boost';

export const getFormDataRma = gql`
    query getFormDataRma($email: String!, $order_number: String!) {
        getFormDataAwRma(email: $email, order_number: $order_number) {
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
mutation requestNewRma (
    $order_number: String!,
    $customer_email: String!,
    $customer_name: String!,
    $custom_fields: [AwRmaCustomFieldInput],
    $order_items: [AwRmaOrderItemsInput],
    $mesage: String,
    $attachments: [AwRmaAttachmentInput]
) {
    createNewRequestAwRma(
        input: {
            order_number: $order_number
            customer_name: $customer_name
            customer_email: $customer_email
            custom_fields: []
            order_items: []
            thread_message: {
                text: $message
                attachments: $attachments
            }
        }
    ) {
        form_data {
            custom_fields {
                is_editable
                type
                refers
                name
                is_required
                website_ids
                frontend_labels {
                    store_id
                    value
                }
            }
            status_list {
                id
                name
            }
        }
        detail_rma {
            confirm_shipping
            aw_rma_id
            aw_rma_increment_id
            status {
                id
                name
            }
            custom_fields {
                field {
                    id
                    frontend_labels {
                        store_id
                        value
                    }
                }
                value {
                    id
                    frontend_labels {
                        store_id
                        value
                    }
                }
            }
            order_date
            order_number
            order_id
            items {
                id
                item_id
                name
                price
                sku
                image_url
                qty_rma
                custom_fields {
                    field {
                        id
                        frontend_labels {
                            store_id
                            value
                        }
                    }
                    value {
                        id
                        frontend_labels {
                            store_id
                            value
                        }
                    }
                }
                url_key
            }
            thread_message {
                id
                request_id
                created_at
                text
                owner_type
                owner_name
                owner_id
                is_auto
                is_internal
                attachments {
                    name
                    file_name
                }
            }
        }
    }
}
`;

export default {
    getFormDataRma,
};
