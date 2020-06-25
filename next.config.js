const withOffline = require('next-offline');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withOffline({
    publicRuntimeConfig: {
        appEnv: process.env.APP_ENV,
    },
    optimization: {
        minimize: process.env.NODE_ENV === 'production', // Update this to true or false
    },
    workboxOpts: {
        swDest: process.env.NEXT_EXPORT ? 'service-worker.js' : 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /^https?.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'offlineCache',
                    expiration: {
                        maxEntries: 200,
                    },
                },
            },
        ],
    },
    experimental: {
        async rewrites() {
            return [
                {
                    source: '/service-worker.js',
                    destination: '/_next/static/service-worker.js',
                },
            ];
        },
    },
    // change this version every build on prod
    generateBuildId: async () => 'swift-pwa-v1.0.0',
}));
