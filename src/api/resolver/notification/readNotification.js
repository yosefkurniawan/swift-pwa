const requestGraph = require('../../graphql-request');
const notificationOutput = require('./schema/notificationOutput');

const query = `
    mutation readNotification (
        $entityId: Int!
    ) {
        readNotification(
            entityId: $entityId
        ) {
            ${notificationOutput}
        }  
    }
`;

async function readNotification(parent, variables, context) {
    const res = await requestGraph(query, variables, context);
    if (res.readNotification) {
        return res.readNotification;
    }
    return res;
}

module.exports = readNotification;
