/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import { setLastPathWithoutLogin, removeLastPathWithoutLogin } from '@helper_auth';
import Router from 'next/router';

import { modules } from '@config';
import { getHost, getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';
import { availableRoute } from './routeServer';

export const routeNoAuth = (path) => {
    const route = ['/customer/account/login', '/customer/account/register', '/customer/account/forgotpassword'];

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
        '/customer/newsletter',
        '/rma/customer',
    ];

    const found = route.find((val) => val === path);

    return typeof found === 'undefined';
};

const setLastPathNoAuth = (req, value = '') => {
    if (req && req.cookies) {
        req.cookies.lastPathNoAuth = value;
    }
};

const routeMiddleware = (params) => {
    const {
        req, res, query, pathname, isLogin, lastPathNoAuth,
    } = params;

    /*
    Set Cache Control response header to enable varnish caching
    */
    if (typeof window === 'undefined') {
        res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
        res.setHeader('CDN-Cache-Control', 'max-age=60');
        res.setHeader('Cache-Control', 'max-age=10');
    }

    /**
     * middleware enabled or disabled feature
     */
    for (const key in modules) {
        const feature = modules[key];
        if (pathname.indexOf(feature.path) >= 0 && !feature.enabled) {
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            } else if (res) {
                res.writeHead(302, {
                    Location: '/',
                });
                res.end();
            }
            return {};
        }
    }

    if (isLogin) {
        const allow = routeNoAuth(pathname);
        if (!allow) {
            if (query.redirect && query.redirect !== '') {
                if (typeof window !== 'undefined') {
                    Router.push(`${getHost()}/${query.redirect}`);
                    removeLastPathWithoutLogin();
                } else {
                    setLastPathNoAuth(req, '');
                    res.writeHead(302, {
                        Location: `/${query.redirect}`,
                    });
                    res.end();
                }
            } else if (typeof window !== 'undefined') {
                Router.push(lastPathNoAuth);
                removeLastPathWithoutLogin();
            } else {
                setLastPathNoAuth(req, '');
                res.writeHead(302, {
                    Location: lastPathNoAuth,
                });
                res.end();
                res.writeHead(302, { Location: lastPathNoAuth });
            }
        } else {
            typeof window !== 'undefined' ? removeLastPathWithoutLogin() : setLastPathNoAuth(req, '');
        }
    } else {
        const allow = routeWithAuth(pathname);
        if (!allow) {
            if (typeof window !== 'undefined') {
                Router.push('/customer/account/login');
                setLastPathWithoutLogin(pathname);
            } else {
                setLastPathNoAuth(req, pathname);
                res.writeHead(302, {
                    Location: '/customer/account/login',
                });
                res.end();
            }
        } else {
            typeof window !== 'undefined' ? removeLastPathWithoutLogin() : setLastPathWithoutLogin(req, '');
        }
    }

    if (modules.checkout.checkoutOnly) {
        const allow = availableRoute(pathname.trim().split('?')[0]);
        if (!allow) {
            if (typeof window !== 'undefined') {
                window.location.href = getStoreHost(window.APP_ENV);
            } else {
                res.statusCode = 302;
                res.setHeader('Location', getStoreHost(getAppEnv()));
            }
        } else if (typeof window !== 'undefined') {
            const destinationUrl = pathname;
            const currentUrl = window.sessionStorage.getItem('currentUrl');
            const prevUrl = window.sessionStorage.getItem('prevUrl');
            if (destinationUrl === '/' && currentUrl === '/' && prevUrl === '/') {
                window.location.href = getStoreHost(window.APP_ENV);
            }
        }
    }
};

export default routeMiddleware;
