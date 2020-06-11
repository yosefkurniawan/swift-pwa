import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import * as CartSchema from '../schema/cart';

export const getGuestCartId = () => useMutation(CartSchema.createCartIdGuest);
export const getCustomerCartId = () => useLazyQuery(CartSchema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});
export const getCartData = () => useQuery(CartSchema.getCart);
export const getCountCart = (cartId) => useQuery(CartSchema.getCountCart, {
    context: {
        request: 'internal',
    },
    variables: {
        cartId,
    },
    skip: cartId === '' || typeof cartId === 'undefined',
});
export const mergeCart = () => useMutation(CartSchema.mergeCart, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export default {
    getGuestCartId,
    getCartData,
    getCountCart,
};
