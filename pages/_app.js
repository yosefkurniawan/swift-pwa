/* eslint-disable radix */
/* eslint-disable max-len */
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
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

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        TagManager.initialize(tagManagerArgs);
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        const allcookie = cookies(ctx);

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const {
            apolloClient, res, pathname, query,
        } = ctx;
        // check if login from server
        let isLogin = 0;
        if (typeof window !== 'undefined') isLogin = getLoginInfo(); else isLogin = allcookie.isLogin || 0;
        isLogin = parseInt(isLogin);
        if (pageProps.withAuth) {
            if (typeof window !== 'undefined') {
                if (isLogin) {
                    if (pathname === '/customer/account/login' && query.redirect && query.redirect !== '') {
                        Router.push(query.redirect);
                    } else if (pathname === '/customer/account/login') Router.push('/customer/account');
                } else if (pathname !== '/customer/account/login') Router.push('/customer/account/login');
            } else if (isLogin) {
                if (pathname === '/customer/account/login' && query.redirect && query.redirect !== '') {
                    res.redirect(query.redirect);
                } else if (pathname === '/customer/account/login') res.redirect('/customer/account');
            } else if (pathname !== '/customer/account/login') res.redirect('/customer/account/login');
        }

        let storeConfig;
        if (!allcookie[storeConfigNameCokie]) {
            storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
        } else {
            storeConfig = allcookie[storeConfigNameCokie];
        }
        // add get session from server
        return { pageProps: { ...pageProps, storeConfig, isLogin } };
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
                <Head>
                    <title>
                        {pageProps.storeConfig && pageProps.storeConfig.default_title ? pageProps.storeConfig.default_title : 'Icube Swift PWA'}
                    </title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>
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
