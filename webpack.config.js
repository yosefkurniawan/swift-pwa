const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        install: './core/public/install.js',
        'firebase-messaging-sw': './core/public/firebase-messaging-sw.js',
        sw: './core/public/sw.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/static'),
    },
};
