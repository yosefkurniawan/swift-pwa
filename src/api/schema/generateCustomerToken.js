const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');

const { gql } = require('apollo-server-express');


const cartSchema = makeExecutableSchema({
    typeDefs: gql`
      type Token {
        originalToken: String,
        token: String,
        message: String
      }
      
      type Query {
        getCustomerToken: Token
      }

      type RevokeCustomerTokenOutput {
        result: Boolean
      }
      
      type Mutation {
        generateCustomerToken(email: String, password: String): Token
        revokeCustomerToken: RevokeCustomerTokenOutput
      }
    `,
});

addMockFunctionsToSchema({ schema: cartSchema });

module.exports = cartSchema;
