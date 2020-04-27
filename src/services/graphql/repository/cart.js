import { useQuery, useMutation } from '@apollo/react-hooks';
import * as CartSchema from '../schema/cart';

export const getGuestCartId = () => useMutation(CartSchema.createCartIdGuest);
export const getCustomerCartId = () => useQuery(CartSchema.createCartIdUser);
export const getCartData = () => useQuery(CartSchema.getCart);
export const getCountCart = () => useQuery(CartSchema.getCountCart);

export default {
    getGuestCartId,
    getCartData,
    getCountCart,
};
