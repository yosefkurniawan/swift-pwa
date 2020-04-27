
import cookies from 'js-cookie';
import { nameToken, expiredToken } from '@config';
import { encrypt, decrypt } from './encryption';

export const setToken = (token) => {
    cookies.set(nameToken, encrypt(token), { expires: expiredToken });
    return true;
};

export const getToken = () => {
    const token = decrypt(cookies.get(nameToken));
    return token;
};

export default {
    setToken,
    getToken,
};
