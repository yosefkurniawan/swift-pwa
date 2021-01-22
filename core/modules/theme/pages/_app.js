/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable radix */
/* eslint-disable max-len */
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@theme_theme';
import { appWithTranslation } from '@i18n';
import { storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import Cookie from 'js-cookie';
import helperCookies from '@helper_cookies';
import {
    expiredCookies, storeConfigNameCookie, GTM, custDataNameCookie, features, sentry,
} from '@config';
import {
    getLoginInfo,
    getLastPathWithoutLogin,
} from '@helper_auth';
import { setResolver, testLocalStorage } from '@helper_localstorage';
// import Fonts from '@helper_fonts';
import TagManager from 'react-gtm-module';
import PageProgressLoader from '@common_loaders/PageProgress';
import getConfig from 'next/config';
import routeMiddleware from '@middleware_route';
import graphRequest from '@graphql_request';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import { unregister } from 'next-offline/runtime';
import Notification from '@lib_firebase/notification';
import firebase from '@lib_firebase/index';

import ModalCookies from '../components/modalCookies';

let deferredPrompt;

const { publicRuntimeConfig } = getConfig();

/*
 * ---------------------------------------------
 * SENTRY INITIALIZATION
 */
if (sentry.enabled && typeof publicRuntimeConfig !== 'undefined' && sentry.dsn[publicRuntimeConfig.appEnv]) {
    const distDir = `${publicRuntimeConfig.rootDir}/.next`;
    Sentry.init({
        enabled: process.env.NODE_ENV === sentry.enableMode,
        integrations: [
            new RewriteFrames({
                iteratee: (frame) => {
                    // eslint-disable-next-line no-param-reassign
                    frame.filename = frame.filename.replace(distDir, 'app:///_next');
                    return frame;
                },
            }),
            new Integrations.BrowserTracing(),
        ],
        environment: publicRuntimeConfig.appEnv,
        dsn: sentry.dsn[publicRuntimeConfig.appEnv],
        tracesSampleRate: 1.0,
    });
}

class MyApp extends App {
    constructor(props) {
        super(props);
        this.isLogin = false;
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const {
            res, pathname, query, req,
        } = ctx;

        /*
         * ---------------------------------------------
         * MAINTAIN LOGIN FLAG
         * check if login from server
         */
        let isLogin = 0;
        let lastPathNoAuth = '';
        let customerData = {};
        const allcookie = req ? req.cookies : {};
        if (typeof window !== 'undefined') {
            isLogin = getLoginInfo();
            lastPathNoAuth = getLastPathWithoutLogin();
            customerData = Cookie.getJSON(custDataNameCookie);
        } else {
            isLogin = allcookie.isLogin || 0;
            customerData = allcookie[custDataNameCookie];
            lastPathNoAuth = (req.session && typeof req.session !== 'undefined' && req.session.lastPathNoAuth
                && typeof req.session.lastPathNoAuth !== 'undefined')
                ? req.session.lastPathNoAuth : '/customer/account';
        }
        isLogin = parseInt(isLogin);

        /*
         * ---------------------------------------------
         * CALLING ROUTING MIDDLEWARE
         */
        routeMiddleware({
            res, req, query, pathname, isLogin, lastPathNoAuth,
        });

        /*
         * ---------------------------------------------
         * GET CONFIGURATIONS FROM COOKIES
         * TO BE PROVIDED INTO PAGE PROPS
         */
        let storeConfig = helperCookies.get(storeConfigNameCookie);
        if (!(storeConfig && storeConfig.secure_base_media_url)) {
            // storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
            storeConfig = await graphRequest(ConfigSchema);
            storeConfig = storeConfig.storeConfig;
        }

        /*
         * ---------------------------------------------
         * RETURNS
         */
        return {
            pageProps: {
                ...pageProps, storeConfig, isLogin, lastPathNoAuth, customerData,
            },
        };
    }

    componentDidMount() {
        /*
         * ---------------------------------------------
         * ADDING CUSTOM SERVICE WORKER
         */
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production' && typeof document !== 'undefined') {
            if (document.readyState === 'complete') {
                this.registerServiceWorker();
            } else {
                window.addEventListener('load', () => {
                    this.registerServiceWorker();
                });
            }
        }

        /*
         * ---------------------------------------------
         * FIREBASE INITIALIZATION
         */
        if (features.pushNotification.enabled) {
            // initial firebase messaging
            Notification.init();
            // handle if have message on focus
            try {
                const messaging = firebase.messaging();
                // Handle incoming messages. Called when:
                // - a message is received while the app has focus
                // - the user clicks on an app notification created by a service worker
                //   `messaging.setBackgroundMessageHandler` handler.
                messaging.onMessage((payload) => {
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification(payload.data.title, {
                            body: payload.data.body,
                            vibrate: [200, 100, 200, 100, 200, 100, 200],
                            icon: payload.data.icons || '',
                            image: payload.data.image || '',
                            data: payload.data,
                            requireInteraction: true,
                        });
                    });
                });
            } catch (err) {
                console.log(err);
            }
        }

        /*
         * LAZY LOADING FONTS
         * Use this to load non critical fonts
         */
        // Fonts();

        /*
         * ---------------------------------------------
         * REMOVE THE SERVER SIDE INJECTED CSS
         * This is for speed performanc purpose
         */
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        /*
         * ---------------------------------------------
         * GTM INITIALIZATION
         */
        const tagManagerArgs = {
            gtmId:
                typeof publicRuntimeConfig !== 'undefined' && GTM.gtmId[publicRuntimeConfig.appEnv]
                    ? GTM.gtmId[publicRuntimeConfig.appEnv]
                    : GTM.gtmId.dev,
        };
        if (GTM.enable) TagManager.initialize(tagManagerArgs);

        /*
         * ---------------------------------------------
         * COOKIE CLEARANCE
         * remove config cookie if the page is reloaded
         */
        if (typeof window !== 'undefined') {
            window.onbeforeunload = function () {
                setResolver({});
                helperCookies.remove(storeConfigNameCookie);
            };
        }
    }

    componentWillUnmount() {
        unregister();
    }

    registerServiceWorker() {
        navigator.serviceWorker.register('/service-worker.js').then(
            (registration) => {
                console.log('Service Worker registration successful with scope: ', registration.scope);
            },
            (err) => {
                console.log('Service Worker registration failed: ', err);
            },
        );
    }

    render() {
        const { Component, pageProps } = this.props;
        const storeCookie = helperCookies.get(storeConfigNameCookie);
        if (!storeCookie) {
            helperCookies.set(storeConfigNameCookie, pageProps.storeConfig);
        }
        pageProps.storeConfig = pageProps.storeConfig ? pageProps.storeConfig : {};
        if (typeof window !== 'undefined' && testLocalStorage() === false) {
            // not available
            return (
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <ModalCookies {...pageProps} />
                </ThemeProvider>
            );
        }

        return (
            <>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <PageProgressLoader />
                    <Component {...pageProps} />
                </ThemeProvider>
            </>
        );
    }
}
export default (appWithTranslation(MyApp));
