/* eslint-disable func-names */
/* eslint-disable radix */
/* eslint-disable max-len */
import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@theme/theme';
import { appWithTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import { withRedux } from '@lib/redux';
import { compose } from 'redux';
import { storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import Cookie from 'js-cookie';
import cookies from 'next-cookies';
import {
    expiredCokies, storeConfigNameCokie, GTM,
} from '@config';
import {
    getLoginInfo,
    setLastPathWithoutLogin,
    getLastPathWithoutLogin,
    removeLastPathWithoutLogin,
} from '@helpers/auth';

import TagManager from 'react-gtm-module';
import '../src/styles/index.css';
import '../src/styles/mage.css';
import PageProgressLoader from '@components/Loaders/PageProgress';

const tagManagerArgs = {
    gtmId: process.env.NODE_ENV === 'production' ? GTM.gtmId.prod : GTM.gtmId.dev,
};

class MyApp extends App {
    constructor(props) {
        super(props);
        this.isLogin = false;
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        const allcookie = cookies(ctx);

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const {
            apolloClient, res, asPath, query, req,
        } = ctx;
        // check if login from server
        let isLogin = 0;
        let lastPathNoAuth = '';
        if (typeof window !== 'undefined') {
            isLogin = getLoginInfo();
            lastPathNoAuth = getLastPathWithoutLogin();
        } else {
            isLogin = allcookie.isLogin || 0;
            lastPathNoAuth = req.session.lastPathNoAuth || '/customer/account';
        }
        isLogin = parseInt(isLogin);
        if (pageProps.withAuth) {
            if (typeof window !== 'undefined') {
                if (isLogin) {
                    if (asPath !== '/customer/account/login') {
                        removeLastPathWithoutLogin();
                    }
                    if (asPath === '/customer/account/login' && query.redirect && query.redirect !== '') {
                        removeLastPathWithoutLogin();
                        Router.push(query.redirect);
                    } else if (asPath === '/customer/account/login') {
                        removeLastPathWithoutLogin();
                        Router.push(lastPathNoAuth);
                    }
                } else if (asPath !== '/customer/account/login') {
                    setLastPathWithoutLogin(asPath);
                    Router.push('/customer/account/login');
                }
            } else if (isLogin) {
                if (asPath !== '/customer/account/login') {
                    req.session.lastPathNoAuth = '';
                }
                if (asPath === '/customer/account/login' && query.redirect && query.redirect !== '') {
                    req.session.lastPathNoAuth = '';
                    res.redirect(query.redirect);
                } else if (asPath === '/customer/account/login') {
                    req.session.lastPathNoAuth = '';
                    res.redirect(lastPathNoAuth);
                }
            } else if (asPath !== '/customer/account/login') {
                req.session.lastPathNoAuth = asPath;
                res.redirect('/customer/account/login');
            }
        }

        let storeConfig;
        if (!allcookie[storeConfigNameCokie]) {
            storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
        } else {
            storeConfig = allcookie[storeConfigNameCokie];
        }
        // add get session from server
        return {
            pageProps: {
                ...pageProps, storeConfig, isLogin, lastPathNoAuth,
            },
        };
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        // GTM & GA
        if (GTM.enable) TagManager.initialize(tagManagerArgs);

        // remove config cookie if page reload
        if (typeof window !== 'undefined') {
            window.onbeforeunload = function () {
                Cookie.remove(storeConfigNameCokie);
            };
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        const storeCokie = Cookie.get(storeConfigNameCokie);
        if (!storeCokie) {
            Cookie.set(storeConfigNameCokie, pageProps.storeConfig, {
                path: '',
                expires: expiredCokies,
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

export default compose(withApollo({ ssr: true }), withRedux)(appWithTranslation(MyApp));
