import React from "react";
import App from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import withApollo from "@services/graphql/api";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@theme/theme";
import { appWithTranslation } from '@i18n'
import "../src/styles/index.css";

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, apollo } = this.props;
        const title = pageProps.pageConfig && pageProps.pageConfig.title
            ? pageProps.pageConfig.title
            : "Swift PWA";
        
        return (
            <ApolloProvider client={apollo}>
                <Head>
                    <title>{title}</title>
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
            </ApolloProvider>
        );
    }
}

export default withApollo(appWithTranslation(MyApp), { getDataFromTree });