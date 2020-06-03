import { gql } from 'apollo-boost';

export const getOrder = () => gql`
    query getOrder($email: String, $order_id: String) {
        ordersFilter(filters: { email: $email, ids: { eq: $order_id } }) {
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
                    items {
                        name
                        sku
                        price
                        qty_ordered
                        row_weight
                    }
                }
            }
        }
    }
`;

export default {
    getOrder,
};
