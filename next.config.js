const withOffline = require('next-offline');

module.exports = withOffline({
    publicRuntimeConfig: {
        appEnv: process.env.APP_ENV,
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
});
