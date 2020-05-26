import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';


export const getGiftCard = () => useQuery(Schema.getGiftCard, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'cache-and-network',
});

export const checkBalance = (code) => useQuery(Schema.checkBalance, {
    context: {
        request: 'internal',
    },
    variables: {
        gift_card_code: code,
    },
    skip: code === '' || !code,
});


export default { getGiftCard, checkBalance };
