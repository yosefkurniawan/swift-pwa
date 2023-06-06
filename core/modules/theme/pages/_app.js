/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable radix */
/* eslint-disable max-len */
import { basePath, custDataNameCookie, features, modules, sentry } from '@config';
import { getLastPathWithoutLogin, getLoginInfo } from '@helper_auth';
import { getLocalStorage, setLocalStorage, setResolver, testLocalStorage } from '@helper_localstorage';
import { appWithTranslation } from '@i18n';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { getAppEnv } from '@root/core/helpers/env';
import { RewriteFrames } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import { getCategories, getVesMenu, storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import { currencyVar, storeConfigVar, cmsPageVar } from '@root/core/services/graphql/cache';
import theme from '@theme_theme';
import Cookie from 'js-cookie';
import { unregister } from 'next-offline/runtime';
import App from 'next/app';
import React from 'react';

import { gql } from '@apollo/client';
import PageProgressLoader from '@common_loaders/PageProgress';
import graphRequest from '@graphql_request';
import Notification from '@lib_firebase/notification';
import firebase from '@lib_firebase/index';
import routeMiddleware from '@middleware_route';
import getConfig from 'next/config';
import TagManager from 'react-gtm-module';

import ModalCookies from '@core_modules/theme/components/modalCookies';
import * as Sentry from '@sentry/node';
import { getDeviceByUA, getUAString } from '@root/core/helpers/deviceDection';

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
        tracesSampleRate: 0.5,
    });
}

class MyApp extends App {
    constructor(props) {
        super(props);
        this.isLogin = false;
    }

    static async getInitialProps(appContex) {
        const { Component, ctx } = appContex;
        const uastring = getUAString(appContex);
        const deviceType = getDeviceByUA(uastring);

        let { pageProps } = await App.getInitialProps(appContex);

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const { res, pathname, query, req } = ctx;

        /*
         * ---------------------------------------------
         * MAINTAIN LOGIN FLAG
         * check if login from server
         */
        let isLogin = 0;
        let lastPathNoAuth = '';
        let customerData = {};
        const allcookie = req ? req.cookies : {};
        let removeDecimalConfig;
        if (typeof window !== 'undefined') {
            isLogin = getLoginInfo();
            lastPathNoAuth = getLastPathWithoutLogin();
            customerData = Cookie.getJSON(custDataNameCookie);
        } else {
            isLogin = allcookie.isLogin || 0;
            customerData = allcookie[custDataNameCookie];
            lastPathNoAuth = req.session && typeof req.session !== 'undefined' && req.session.lastPathNoAuth && typeof req.session.lastPathNoAuth !== 'undefined'
                ? req.session.lastPathNoAuth
                : '/customer/account';
        }
        isLogin = parseInt(isLogin);

        /*
         * ---------------------------------------------
         * [COOKIES] OTHER
         */
        const app_cookies = { cookies_currency: req ? req.cookies.app_currency : null };

        /*
         * ---------------------------------------------
         * CALLING ROUTING MIDDLEWARE
         */
        routeMiddleware({
            res,
            req,
            query,
            pathname,
            isLogin,
            lastPathNoAuth,
        });

        /*
         * ---------------------------------------------
         * GET CONFIGURATIONS FROM COOKIES
         * TO BE PROVIDED INTO PAGE PROPS
         */
        let dataVesMenu;
        let frontendOptions;
        let { storeConfig } = pageProps;

        if (typeof window === 'undefined' && (!storeConfig || typeof storeConfig.secure_base_media_url === 'undefined')) {
            // storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
            /** comment data cache from internal request * */
            // storeConfig = await requestInternal('getConfig');
            storeConfig = await graphRequest(ConfigSchema);
            frontendOptions = storeConfig;
            // Handle redirecting to tomaintenance page automatically when GQL is in maintenance mode.
            // We do this here since query storeConfig is the first query and be done in server side
            if (ctx && storeConfig.response && storeConfig.response.status && storeConfig.response.status > 500) {
                ctx.res.redirect('/maintenance');
            }
            storeConfig = storeConfig.storeConfig;
            if (!modules.checkout.checkoutOnly) {
                dataVesMenu = storeConfig.pwa.ves_menu_enable
                    ? await graphRequest(getVesMenu, { alias: storeConfig.pwa.ves_menu_alias }, {}, { method: 'GET' }) : await graphRequest(getCategories, {}, {}, { method: 'GET' });
            }
            frontendOptions = frontendOptions.storeConfig;
            removeDecimalConfig = storeConfig?.pwa?.remove_decimal_price_enable !== null ? storeConfig?.pwa?.remove_decimal_price_enable : false;
        } else if (typeof window !== 'undefined' && !storeConfig) {
            storeConfig = storeConfigVar();
            if (!storeConfig || storeConfig === '' || storeConfig === {}) {
                storeConfig = await pageProps.apolloClient
                    .query({
                        query: gql`
                            ${ConfigSchema}
                        `,
                    })
                    .then(({ data }) => data);

                // Handle redirecting to tomaintenance page automatically when GQL is in maintenance mode.
                // We do this here since query storeConfig is the first query and be done in server side
                if (ctx && storeConfig.response && storeConfig.response.status && storeConfig.response.status > 500) {
                    ctx.res.redirect('/maintenance');
                }

                storeConfig = storeConfig.storeConfig;
            }

            if (!modules.checkout.checkoutOnly) {
                dataVesMenu = getLocalStorage('pwa_vesmenu');
                if (!dataVesMenu) {
                    dataVesMenu = storeConfig.pwa.ves_menu_enable
                        ? await pageProps.apolloClient
                            .query({
                                query: gql`
                                      ${getVesMenu}
                                  `,
                                variables: { alias: storeConfig.pwa.ves_menu_alias },
                            })
                            .then(({ data }) => data)
                        : await pageProps.apolloClient
                            .query({
                                query: gql`
                                      ${getCategories}
                                  `,
                            })
                            .then(({ data }) => data);
                }
            }
            frontendOptions = storeConfig;
            removeDecimalConfig = storeConfig?.pwa?.remove_decimal_price_enable !== null ? storeConfig?.pwa?.remove_decimal_price_enable : false;
        }

        /*
         * ---------------------------------------------
         * RETURNS
         */
        let token;
        if (req && req.session && req.session.token) {
            token = req.session.token;
        }
        return {
            pageProps: {
                ...pageProps,
                app_cookies,
                storeConfig,
                isLogin,
                lastPathNoAuth,
                customerData,
                token,
                removeDecimalConfig,
                dataVesMenu,
                frontendOptions,
                deviceType,
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
         * REMOVE CONSOLE
         * remove all console.log statement when APP_ENV = 'prod'
         */
        if (getAppEnv() === 'prod') {
            // eslint-disable-next-line no-console
            console.log = () => { };
        }

        /*
         * ---------------------------------------------
         * FIREBASE INITIALIZATION
         */
        if (features.firebase.config.apiKey !== '' && features.firebase.pushNotification.enabled) {
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
                        // This prevents to show one notification for each tab
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.log('[firebase-messaging-sw.js] Received foreground message ', payload);
                            const lastNotification = localStorage.getItem('lastNotification');
                            const isDifferentContent = payload.data.updated_date !== lastNotification;
                            if (isDifferentContent) {
                                localStorage.setItem('lastNotification', payload.data.updated_date + payload.data.title);
                                registration.showNotification(payload.data.title, {
                                    body: payload.data.body,
                                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                                    icon: payload.data.icons || '',
                                    image: payload.data.image || '',
                                    requireInteraction: true,
                                    data: payload.data,
                                });
                            }
                        }, Math.random() * 1000);
                    });
                });
            } catch (err) {
                // eslint-disable-next-line no-console
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

        /* Google Tag Manager
        * this gtm configuration is enabled via backoffice.
        * before enable this configuration, firstly you need to import the gtm tags json.
        * gtm tags json need to be exported from Magento admin in Welpixel GTM configuration.
        * adjust the tag name if you want before import into GTM dashboard setting.
        * as reference you can find sample gtm tags in folder "sample/gtm" folder
        * NOTE: this GTM functionality includes connecting to GA via GTM tag.
        */

        const storeConfig = storeConfigVar();
        let GTM = {};

        if (storeConfig && storeConfig.pwa) {
            GTM = {
                enable: storeConfig && storeConfig.pwa.gtm_enable,
                gtmId: {
                    local: storeConfig && storeConfig.pwa.gtm_id_local ? storeConfig.pwa.gtm_id_local : '',
                    dev: storeConfig && storeConfig.pwa.gtm_id_dev ? storeConfig.pwa.gtm_id_dev : '',
                    stage: storeConfig && storeConfig.pwa.gtm_id_stage ? storeConfig.pwa.gtm_id_stage : '',
                    prod: storeConfig && storeConfig.pwa.gtm_id_prod ? storeConfig.pwa.gtm_id_prod : '',
                },
            };
        }

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
            };
        }
    }

    componentWillUnmount() {
        unregister();
    }

    registerServiceWorker() {
        navigator.serviceWorker.register(`${basePath}/service-worker.js`).then(
            (registration) => {
                // eslint-disable-next-line no-console
                console.log('Service Worker registration successful with scope: ', registration.scope);
            },
            (err) => {
                // eslint-disable-next-line no-console
                console.log('Service Worker registration failed: ', err);
            },
        );
    }

    render() {
        const { Component, pageProps } = this.props;
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

        if (typeof window !== 'undefined') {
            cmsPageVar(pageProps.storeConfig && pageProps.storeConfig.cms_page ? pageProps.storeConfig.cms_page : '');
            storeConfigVar(pageProps.storeConfig);
            if (!modules.checkout.checkoutOnly) {
                setLocalStorage('pwa_vesmenu', pageProps.dataVesMenu);
            }
            setLocalStorage('remove_decimal_config', pageProps.removeDecimalConfig);
            setLocalStorage('pricing_config', {
                locales: pageProps.storeConfig && pageProps.storeConfig.locale,
                remove_decimal_config: pageProps.removeDecimalConfig,
            });
            const appCurrency = Cookie.get('app_currency');
            currencyVar({
                currency: pageProps.storeConfig.base_currency_code,
                locale: pageProps.storeConfig.locale,
                enableRemoveDecimal: pageProps.storeConfig?.pwa?.remove_decimal_price_enable,
                appCurrency,
            });
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
export default appWithTranslation(MyApp);
