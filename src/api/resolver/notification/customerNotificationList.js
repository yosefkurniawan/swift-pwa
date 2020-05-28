/* eslint-disable no-unused-vars */
const requestGraph = require('../../graphql-request');
const notificationOutput = require('./schema/notificationOutput');

const query = `
    query customerNotificationList {
        customerNotificationList {
            ${notificationOutput}
        }
    }
`;

async function customerNotificationList(parent, variables, context) {
    const res = await requestGraph(query, {}, context);
    if (res && res.customerNotificationList) {
        return res.customerNotificationList;
    }
    return res;
}

module.exports = customerNotificationList;
