import { gql } from 'apollo-boost';

export const getGiftCard = gql`
    {
        customer {
            gift_card {
                giftcard_code
                giftcard_balance
            }
        }
    }
`;

export const checkBalance = gql`
   query checkBalance($gift_card_code: String!) {
        giftCardAccount(input:{
            gift_card_code: $gift_card_code
        }){
            code
            balance
            initial_balance
            expiration_date
        }
    }
`;

export default {
    getGiftCard,
};
