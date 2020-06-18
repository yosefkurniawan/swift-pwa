/* eslint-disable import/prefer-default-export */
const { HOST } = require('../../swift.config');

const getHost = () => {
    const globalHost = HOST[process.env.APP_ENV] || HOST.dev;
    return globalHost;
};

module.exports = { getHost };
