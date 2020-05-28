/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCartData = (token, cartId) => useQuery(Schema.getCart,
    {
        variables: { cartId },
        context: {
            request: 'internal',
            headers: {
                Authorization: typeof window === 'undefined' ? `Bearer ${token}` : '',
            },
        },
        fetchPolicy: 'cache-and-network',
    });
