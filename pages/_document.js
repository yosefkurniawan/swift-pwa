/* eslint-disable react/no-danger */
import React from 'react';
import Document, {
    Html, Head, Main, NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '@theme/theme';
import { GA_TRACKING_ID, GTM_ID } from '@config';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/assets/img/swiftpwa_apple_touch.png" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,500,700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,500i,600,700,900&display=swap" rel="stylesheet" />

                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${GA_TRACKING_ID}', {
                                    page_path: window.location.pathname,
                                    });
                                `,
                        }}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','${GTM_ID}');
                            `,
                        }}
                    />
                </Head>
                <body>
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `
                                <iframe
                                    src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                                    height="0"
                                    width="0"
                                    style="display:none;visibility:hidden"
                                />
                            `,
                        }}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
