const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');

const { gql } = require('apollo-server-express');


const customerSchema = makeExecutableSchema({
    typeDefs: gql`
      input GiftCardAccountInput {
        gift_card_code: String!
      }

      type GiftCardAccountOutput {
        balance: Float
        code: String
        expiration_date: String
        initial_balance: Float
       }
      
      type Query {
        giftCardAccount(
            input: GiftCardAccountInput!
            ): GiftCardAccountOutput
      }
    `,
});

addMockFunctionsToSchema({ schema: customerSchema });

module.exports = customerSchema;
