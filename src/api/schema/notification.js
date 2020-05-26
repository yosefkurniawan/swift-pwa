const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const { gql } = require('apollo-server-express');

const notificationSchema = makeExecutableSchema({
    typeDefs: gql`
        type DataNotification {
            content: String
            createdAt: String
            entityId: Int
            subject: String
            unread: Boolean
        }

        type ResultNotification {
            items: [DataNotification]
            totalUnread: Int
        }

        type Query {
            customerNotificationList: ResultNotification
        }
        
        type Mutation {
            readNotification(entityId: Int!): ResultNotification
        }
    `,
});

addMockFunctionsToSchema({ schema: notificationSchema });
module.exports = notificationSchema;
