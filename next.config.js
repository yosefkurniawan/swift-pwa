/* eslint-disable import/no-extraneous-dependencies */
// const withOffline = require('next-offline');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { createSecureHeaders } = require('next-secure-headers');
const withPWA = require('next-pwa')({
    // dest: '.next',
    // dest: 'public',
    swSrc: 'core/public/sw.js',
    sw: 'sw.js',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});
const { basePath } = require('./swift.config');

module.exports = withPWA({
    basePath,
    // Secure Header
    async headers() {
        return [{ source: '/(.*)', headers: createSecureHeaders() }];
    },
    // Disable X-Powered-By
    poweredByHeader: false,
    future: {
        webpack5: true,
    },
    // dontAutoRegisterSw: true,
    productionBrowserSourceMaps: true,
    publicRuntimeConfig: {
        appEnv: process.env.APP_ENV,
        rootDir: __dirname,
    },
    optimization: {
        minimize: process.env.NODE_ENV === 'production', // Update this to true or false
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
