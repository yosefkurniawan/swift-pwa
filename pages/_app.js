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
import theme from '@theme/theme';
import { appWithTranslation } from '@i18n';
import { storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import Cookie from 'js-cookie';
import cookies from 'next-cookies';
import {
    expiredCokies, storeConfigNameCokie, GTM, custDataNameCookie,
} from '@config';
import {
    getLoginInfo,
    getLastPathWithoutLogin,
} from '@helpers/auth';
// import Fonts from '@helpers/fonts';
import TagManager from 'react-gtm-module';
import PageProgressLoader from '@common_loaders/PageProgress';
import graphRequest from '../src/api/graphql/request';
import routeMiddleware from '../src/middlewares/route';
import '../src/styles/index.css';
import '../src/styles/mediaquery.css';
import '../src/styles/flexboxgrid.min.css';

const tagManagerArgs = {
    gtmId: GTM.gtmId[process.env.APP_ENV] || GTM.gtmId.dev,
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
            res, asPath, query, req,
        } = ctx;
        // check if login from server
        let isLogin = 0;
        let lastPathNoAuth = '';
        let customerData = {};
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
        routeMiddleware({
            res, req, query, asPath, isLogin, lastPathNoAuth,
        });
        let storeConfig;
        if (!allcookie[storeConfigNameCokie]) {
            // storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
            storeConfig = await graphRequest(ConfigSchema);
            storeConfig = storeConfig.storeConfig;
        } else {
            storeConfig = allcookie[storeConfigNameCokie];
        }
        // add get session from server
        return {
            pageProps: {
                ...pageProps, storeConfig, isLogin, lastPathNoAuth, customerData,
            },
        };
    }

    componentDidMount() {
        // lazy load fonts. use this to load non critical fonts
        // Fonts();
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
        pageProps.storeConfig = pageProps.storeConfig ? pageProps.storeConfig : {};
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
