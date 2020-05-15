
import cookies from 'js-cookie';
import { nameToken, expiredToken } from '@config';
import { decrypt } from './encryption';


export const setToken = (token, expired) => {
    cookies.set(nameToken, token, { expires: expired || expiredToken });
    return true;
};

// akan di renaeme jika sudah selesai migrasi
export const getTokenFromServer = (tokenCustomer) => {
    const token = !tokenCustomer || tokenCustomer === '' || tokenCustomer === undefined ? '' : decrypt(tokenCustomer);
    return token;
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
