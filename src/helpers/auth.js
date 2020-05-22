/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import cookies from 'js-cookie';
import { expiredToken } from '@config';

export const setLogin = (isLogin = 0, expired) => {
    cookies.set('isLogin', isLogin, { expires: expired || expiredToken });
    return 0;
};

export const getLoginInfo = () => {
    const isLogin = cookies.get('isLogin');
    return parseInt(isLogin) || 0;
};


export const removeIsLoginFlagging = () => {
    cookies.remove('isLogin');
};
