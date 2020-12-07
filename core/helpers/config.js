/* eslint-disable import/prefer-default-export */
const { HOST, graphqlEndpoint } = require('../../swift.config');

const getHost = () => {
    const appEnv = typeof window !== 'undefined' ? window.APP_ENV : process.env.APP_ENV;
    const globalHost = HOST[appEnv] || HOST.prod;
    return globalHost;
};

const getStoreHost = (appEnv = typeof window !== 'undefined' ? window.APP_ENV : process.env.APP_ENV) => {
    let storeHost = graphqlEndpoint[appEnv] || graphqlEndpoint.prod;
    storeHost = storeHost.replace('graphql', '');
    return storeHost;
};

module.exports = { getHost, getStoreHost };
