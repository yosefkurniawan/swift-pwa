
import cookies from 'js-cookie';
import { nameToken, expiredToken } from '@config';
import { encrypt, decrypt } from './encryption';

export const setToken = (token) => {
    cookies.set(nameToken, encrypt(token), { expires: expiredToken });
    return true;
};

export const getToken = () => {
    const tokenCustomer = cookies.get(nameToken);
    const token = !tokenCustomer || tokenCustomer === '' || tokenCustomer === undefined ? '' : decrypt(tokenCustomer);
    return token;
};

export const removeToken = () => {
    cookies.remove(nameToken);
};

export default {
    setToken,
    getToken,
};
