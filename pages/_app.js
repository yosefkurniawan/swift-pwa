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
import { expiredCokies, storeConfigNameCokie, nameToken } from '@config';
import { getTokenFromServer, getToken } from '@helpers/token';
import '../src/styles/index.css';
import '../src/styles/mage.css';

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
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
        if (pageProps.withAuth) {
            if (typeof window !== 'undefined') {
                const token = getToken(nameToken);
                if (token && token !== '') {
                    if (pathname === '/customer/account/login' && query.redirect && query.redirect !== '') {
                        Router.push(query.redirect);
                    } else if (pathname !== '/customer/account') Router.push('/customer/account');
                } else if (pathname !== '/customer/account/login') Router.push('/customer/account/login');
            } else {
                const token = getTokenFromServer(allcookie[nameToken]);
                if (token && token !== '') {
                    if (pathname === '/customer/account/login' && query.redirect && query.redirect !== '') {
                        res.redirect(query.redirect);
                    } else if (pathname !== '/customer/account') res.redirect('/customer/account');
                } else if (pathname !== '/customer/account/login') res.redirect('/customer/account/login');
            }
        }

        let storeConfig;
        if (!allcookie[storeConfigNameCokie]) {
            storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
        } else {
            storeConfig = allcookie[storeConfigNameCokie];
        }
        return { pageProps: { ...pageProps, storeConfig } };
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
                    <Component {...pageProps} />
                </ThemeProvider>
            </>
        );
    }
}

export default compose(withApollo({ ssr: true }), withRedux)(appWithTranslation(MyApp));
