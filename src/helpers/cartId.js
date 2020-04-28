import Cookies from 'js-cookie';
import { nameCartId } from '@config';

export const getCartId = () => {
    const cartId = Cookies.get(nameCartId);
    return cartId;
};

export const setCartId = (token) => {
    Cookies.set(nameCartId, token);
    return true;
};

export const removeCartId = () => {
    Cookies.remove(nameCartId);
    return true;
};

export default {

};
