import { gql } from '@apollo/client';

export const getOrder = () => gql`
    query getOrder($email: String, $order_number: String) {
        ordersFilter(filters: { email: $email, ids: { eq: $order_number } }) {
            data {
                order_number
                id
                detail {
                    tax_amount
                    payment {
                        shipping_amount
                    }
                    grand_total
                    total_qty_ordered
                    global_currency_code
                    discount_amount
                    coupon {
                        code
                        rule_name
                        is_use_coupon
                    }
                    items {
                        item_id
                        parent_item_id
                        name
                        sku
                        price
                        qty_ordered
                        row_weight
                        categories {
                            entity_id
                            name
                        }
                        rating {
                            total
                            value
                        }
                        quantity_and_stock_status {
                            is_in_stock
                            qty
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getOrder,
};
