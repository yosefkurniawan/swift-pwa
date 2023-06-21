/* eslint-disable import/no-extraneous-dependencies */
const withOffline = require('next-offline');
const { createSecureHeaders } = require('next-secure-headers');
const { basePath } = require('./swift.config');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const withCSS = require('@zeit/next-css');
const { i18n } = require('./next-i18next.config')

module.exports = withOffline({
    i18n,
    basePath,
    // Secure Header
    async headers() {
        return [{ source: '/(.*)', headers: createSecureHeaders() }];
    },
    // Disable X-Powered-By
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    publicRuntimeConfig: {
        appEnv: process.env.APP_ENV,
        rootDir: __dirname,
    },
    webpack: (
        config,
        {
            isServer,
            webpack,
        },
    ) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        // config.plugins.push(new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     reportFilename: './analyze/client.html',
        // }));
        config.plugins.push(
            new webpack.ProvidePlugin({
                React: 'react',
            }),
        );
        if (!isServer) {
            // eslint-disable-next-line no-param-reassign
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
        }
        return config;
    },
    async rewrites() {
        return [
            {
                source: `${basePath}/service-worker.js`,
                destination: '/_next/static/service-worker.js',
            },
        ];
    },
    // enable code below on Prod and increase the version everytime before running build script
    // generateBuildId: async () => 'swift-pwa-v1.0.0',
});
