const { GraphQLClient } = require('graphql-request');

function requestGraph(query, variables = {}, context = {}) {
    return new Promise((resolve) => {
        const headers = {
            Authorization: context.session.token ? `Bearer ${context.session.token}` : '',
        };
        const client = new GraphQLClient('https://swiftpwa-be.testingnow.me/graphql', {
            headers,
        });
        console.log(client)
        client.request(query, variables).then((data) => resolve(data)).catch((err) => resolve(err));
    });
}

module.exports = requestGraph;
