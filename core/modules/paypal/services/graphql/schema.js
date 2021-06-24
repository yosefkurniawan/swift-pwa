import { gql } from '@apollo/client';

export const setPaypalPaymentMethod = gql`
mutation setPaypalPaymentMethod(
    $cartId: String!,
    $payerId: String!,
    $token: String!
) {
    setPaymentMethodOnCart(input: {
      cart_id: $cartId
      payment_method: {
        code: "paypal_express"
        paypal_express: {
          payer_id: $payerId
          token: $token
        }
      }
    }) {
      cart {
        selected_payment_method {
          code
          title
        }
      }
    }
  }
  
`;

export default setPaypalPaymentMethod;
