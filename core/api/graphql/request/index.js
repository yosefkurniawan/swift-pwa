/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
const { GraphQLClient, gql } = require('graphql-request');
const { graphqlEndpoint, storeCode } = require('../../../../swift.config');

const { decrypt } = require('../../../helpers/encryption');
const { getAppEnv, getAccessEnv } = require('../../../helpers/env');

function requestGraph(query, variables = {}, context = {}, config = {}) {
    let token = '';
    if (config.token) {
        if (query.includes('snap_client_key')) {
            token = `Bearer ${getAccessEnv()}`;
        } else {
            token = `Bearer ${config.token}`;
        }
    } else if (context.session || context.headers) {
        if (query.includes('snap_client_key')) {
            token = `Bearer ${getAccessEnv()}`;
        } else {
            token = context.session.token
                ? `Bearer ${decrypt(context.session.token)}`
                : context.headers.authorization
                    ? context.headers.authorization
                    : '';
        }
    } else if (query.includes('snap_client_key')) {
        token = `Bearer ${getAccessEnv()}`;
    }
    const additionalHeader = storeCode ? { store: storeCode } : {};
    if (token && token !== '') {
        additionalHeader.Authorization = token;
    }
    const headers = {
        ...additionalHeader,
    };
    if (config.method && config.method === 'GET') {
        return new Promise((resolve) => {
            const appEnv = getAppEnv();

            const graphQLClient = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
                method: 'GET',
                jsonSerializer: {
                    parse: JSON.parse,
                    stringify: JSON.stringify,
                },
            });

            const req = gql`${query}`;
            graphQLClient.request(req, variables).then((data) => {
                resolve(data);
            }).catch((err) => resolve(err));
        });
    }
    return new Promise((resolve) => {
        const appEnv = getAppEnv();
        const client = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
            headers,
        });
        client
            .request(query, variables)
            .then((data) => resolve(data))
            .catch((err) => resolve(err));
    });
}

module.exports = requestGraph;
