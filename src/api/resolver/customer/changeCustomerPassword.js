const requestGraph = require('../../graphql-request');
const customerOutput = require('./schema/customerOutput');

const query = `
    mutation changeCustomerPassword(
        $currentPassword: String!, 
        $newPassword: String!
    ) {
        changeCustomerPassword(
            currentPassword: $currentPassword, 
            newPassword: $newPassword
        ) {
            ${customerOutput}
        }
    }
`;

async function changeCustomerPassword(parent, variables, context) {
    const res = await requestGraph(query, variables, context);
    if (res.changeCustomerPassword) {
        return res.changeCustomerPassword;
    }
    return res;
}

module.exports = changeCustomerPassword;
