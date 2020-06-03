import Cookies from 'js-cookie';
import server from 'next-cookies';
import { nameCheckoutCookie, expiredDefault } from '@config';

export const getCheckoutData = () => {
    const data = Cookies.getJSON(nameCheckoutCookie);
    return data;
};

export const getCheckoutDataFromRequest = (ctx) => {
    const data = server(ctx);
    return data[nameCheckoutCookie];
};

export const setCheckoutData = (data) => {
    Cookies.set(nameCheckoutCookie, data, { expires: expiredDefault });
    return true;
};

export const removeCheckoutData = () => {
    Cookies.remove(nameCheckoutCookie);
    return true;
};

export default {};
