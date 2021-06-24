import { gql } from '@apollo/client';

export const createPaypalExpressToken = gql`
    mutation createPaypalExpressToken(
        $cartId: String!, $code: String!, $returnUrl: String!, $cancelUrl: String!
    ) {
        createPaypalExpressToken(input: {
            cart_id: $cartId,
            code: $code,
            urls: {
            return_url: $returnUrl,
            cancel_url: $cancelUrl
            }
        }) {
            paypal_urls {
                edit
                start
            }
            token
        }
    }
`;

export default {
    createPaypalExpressToken,
};
