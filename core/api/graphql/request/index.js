/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
const { GraphQLClient } = require('graphql-request');
const { graphqlEndpoint } = require('../../../../swift.config');

const { decrypt } = require('../../../helpers/encryption');
const { getAppEnv } = require('../../../helpers/env');
const { getStoreCodeServer } = require('../../../helpers/store');

function requestGraph(query, variables = {}, context = {}, config = {}) {
    let token = '';
    const selectStore = getStoreCodeServer(context);
    if (config.token) {
        token = `Bearer ${config.token}`;
    } else if (context.session || context.headers) {
        token = context.session.token ? `Bearer ${decrypt(context.session.token)}`
            : context.headers.authorization ? context.headers.authorization : '';
    }
    return new Promise((resolve) => {
        const additionalHeader = (selectStore && selectStore !== '') ? { store: selectStore } : {};
        const headers = {
            Authorization: token,
            ...additionalHeader,
        };
        const appEnv = getAppEnv();
        const client = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
            headers,
        });
        console.log(client);
        client.request(query, variables).then((data) => resolve(data)).catch((err) => resolve(err));
    });
}

module.exports = requestGraph;
