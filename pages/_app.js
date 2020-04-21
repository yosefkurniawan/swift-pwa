import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@theme/theme';
import { appWithTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import { withRedux } from '@lib/redux';
import { compose } from 'redux';
import ConfigSchema from '@services/graphql/schema/config';
import Cookie from 'js-cookie';
import cookies from 'next-cookies';
import { expiredCokies, storConfigNameCokie } from '@config';
import '../src/styles/index.css';

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
        const { apolloClient } = ctx;

        let storeConfig;
        if (!allcookie[storConfigNameCokie]) {
            storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
        } else {
            storeConfig = allcookie[storConfigNameCokie];
        }
        return { pageProps: { ...pageProps, storeConfig } };
    }

    render() {
        const { Component, pageProps } = this.props;
        const storeCokie = Cookie.get(storConfigNameCokie);
        if (!storeCokie) {
            Cookie.set(storConfigNameCokie, pageProps.storeConfig, { path: '', expires: expiredCokies });
        }

        return (
            <>
                <Head>
                    <title>{ pageProps.storeConfig.default_title || 'Icube Swift PWA' }</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
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
