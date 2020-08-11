/* eslint-disable no-unused-expressions */
import {
    setLastPathWithoutLogin,
    removeLastPathWithoutLogin,
} from '@helpers/auth';
import Router from 'next/router';

export const routeNoAuth = (path) => {
    const route = [
        '/customer/account/login',
        '/customer/account/register',
        '/customer/account/forgotpassword',
    ];

    const found = route.find((val) => val === path);

    return typeof found === 'undefined';
};

export const routeWithAuth = (path) => {
    const route = [
        '/aw_rewardpoints/info',
        '/sales/order/history',
        '/customer/account/profile',
        '/customer/account/address',
        '/awgiftcard/card',
        '/customer/account/storecredit',
        '/inboxnotification/notification',
        '/customer/setting',
        '/rma/customer',
    ];

    const found = route.find((val) => val === path);

    return typeof found === 'undefined';
};

const setLastPathNoAuth = (req, value = '') => {
    if (req && req.session) {
        req.session.lastPathNoAuth = value;
    }
};

const routeMiddleware = (params) => {
    const {
        req, res, query, asPath, isLogin, lastPathNoAuth,
    } = params;
    if (isLogin) {
        const allow = routeNoAuth(asPath);
        if (!allow) {
            if (query.redirect && query.redirect !== '') {
                if (typeof window !== 'undefined') {
                    Router.push(query.redirect);
                    removeLastPathWithoutLogin();
                } else {
                    res.redirect(query.redirect);
                    setLastPathNoAuth(req, '');
                }
            } else if (typeof window !== 'undefined') {
                Router.push(lastPathNoAuth);
                removeLastPathWithoutLogin();
            } else {
                res.redirect(lastPathNoAuth);
                setLastPathNoAuth(req, '');
            }
        } else {
            typeof window !== 'undefined' ? removeLastPathWithoutLogin() : setLastPathNoAuth(req, '');
        }
    } else {
        const allow = routeWithAuth(asPath);
        if (!allow) {
            if (typeof window !== 'undefined') {
                Router.push('/customer/account/login');
                setLastPathWithoutLogin(asPath);
            } else {
                setLastPathNoAuth(req, asPath);
                res.redirect('/customer/account/login');
            }
        } else {
            typeof window !== 'undefined' ? removeLastPathWithoutLogin() : setLastPathWithoutLogin(req, '');
        }
    }
};

export default routeMiddleware;
