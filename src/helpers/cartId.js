import Cookies from 'js-cookie';
import { nameCartId, nameGuestCartId, expiredDefault } from '@config';

export const getCartId = () => {
    const cartId = Cookies.get(nameCartId);
    return cartId;
};

export const setCartId = (token, expired) => {
    Cookies.set(nameCartId, token, { expires: expired || expiredDefault });
    return true;
};

export const removeCartId = () => {
    Cookies.remove(nameCartId);
    return true;
};

export const getGuestCartId = () => {
    const cartId = Cookies.get(nameGuestCartId);
    return cartId;
};

export const setGuestCartId = (token, expired) => {
    Cookies.set(nameGuestCartId, token, { expires: expired || expiredDefault });
    return true;
};

export const removeGuestCartId = () => {
    Cookies.remove(nameGuestCartId);
    return true;
};

export default {

};
