import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import * as CartSchema from '../schema/cart';

export const getGuestCartId = () => useMutation(CartSchema.createCartIdGuest);
export const getCustomerCartId = () => useLazyQuery(CartSchema.getCartIdUser, {
    context: {
        request: 'internal',
    },
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
export const mergeCart = (token) => useMutation(CartSchema.mergeCart, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    skip: token === '' || !token,
});

export default {
    getGuestCartId,
    getCartData,
    getCountCart,
};
