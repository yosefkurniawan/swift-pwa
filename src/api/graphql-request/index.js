const { GraphQLClient } = require('graphql-request');
const { decrypt } = require('../../helpers/encryption');

function requestGraph(query, variables = {}, context = {}) {
    const token = context.session.token ? `Bearer ${decrypt(context.session.token)}` : '';
    return new Promise((resolve) => {
        const headers = {
            Authorization: token,
        };
        const client = new GraphQLClient('https://swiftpwa-be.testingnow.me/graphql', {
            headers,
            skip: token === '' || !token,
        });
        console.log(client);
        client.request(query, variables).then((data) => resolve(data)).catch((err) => resolve(err));
    });
}

module.exports = requestGraph;
