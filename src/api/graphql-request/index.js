/* eslint-disable no-nested-ternary */
const { GraphQLClient } = require('graphql-request');
const { decrypt } = require('../../helpers/encryption');

function requestGraph(query, variables = {}, context = {}) {
    return new Promise((resolve) => {
        const headers = {
            Authorization: context.session.token ? `Bearer ${decrypt(context.session.token)}`
                : context.headers.authorization ? context.headers.authorization : '',
        };
        const client = new GraphQLClient('https://swiftpwa-be.testingnow.me/graphql', {
            headers,
        });
        console.log(client);
        client.request(query, variables).then((data) => resolve(data)).catch((err) => resolve(err));
    });
}

module.exports = requestGraph;
