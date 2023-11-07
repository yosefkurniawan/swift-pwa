/* eslint-disable import/no-extraneous-dependencies */
const { createSecureHeaders } = require('next-secure-headers');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const withPWA = require('next-pwa')({
    dest: 'public',
    swSrc: 'core/public/sw.js',
    sw: 'sw.js',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});
const { i18n } = require('./next-i18next.config');
const { basePath } = require('./swift.config');

module.exports = withPWA({
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
    // generateInDevMode: true, // please comment if develop to production
    // enable code below on Prod and increase the version everytime before running build script
    // generateBuildId: async () => 'swift-pwa-v1.0.0',
});
