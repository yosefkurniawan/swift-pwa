/* eslint-disable no-param-reassign */
const requestGraph = require('../graphql-request');

const query = `
 query {
    customerRewardPoints {
      balance
      balanceCurrency
      formatedBalanceCurrency 
      formatedSpendRate
      spendRate
      transactionCount
      transaction {
        transactionId
        balance
        comment
        expirationDate
        points
        transactionDate
      }
    }
  }
`;

async function customerRewardPoints(parent, args, context) {
    const res = await requestGraph(query, {}, context);
    if (res.customerRewardPoints) {
        return res.customerRewardPoints;
    }
    return res;
}

module.exports = customerRewardPoints;
