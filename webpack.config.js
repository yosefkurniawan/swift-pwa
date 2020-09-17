const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        install: './src/public/install.js',
        'firebase-messaging-sw': './src/public/firebase-messaging-sw.js',
        sw: './src/public/sw.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/static'),
    },
};
