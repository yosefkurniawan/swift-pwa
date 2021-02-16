const path = require('path');
const { assetsVersion } = require('./swift.config');

module.exports = {
    mode: 'production',
    entry: {
        install: './core/public/install.js',
        'firebase-messaging-background': './core/public/firebase-messaging-background.js',
        'firebase-messaging-foreground': './core/public/firebase-messaging-foreground.js',
    },
    output: {
        filename: `[name].${assetsVersion}.js`,
        path: path.resolve(__dirname, 'public/static/firebase'),
    },
};
