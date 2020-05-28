const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');

const { gql } = require('apollo-server-express');

const rewardSchema = makeExecutableSchema({
    typeDefs: gql`
        type TransactionData {
            balance: Float
            comment: String
            expirationDate: String
            points: Float
            transactionDate: String
            transactionId: Int
        }
        type CustomerRewardPoints {
            balance: Float
            balanceCurrency: Float
            formatedBalanceCurrency: String
            formatedSpendRate: String
            spendRate: Float
            transaction: [TransactionData]
            transactionCount: Int
        }

        type Query {
            customerRewardPoints: CustomerRewardPoints
        }

    `,
});

addMockFunctionsToSchema({ schema: rewardSchema });

module.exports = rewardSchema;
