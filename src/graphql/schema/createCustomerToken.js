const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');

const { gql } = require('apollo-server-express');


const customerSchema = makeExecutableSchema({
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
        createCustomerToken(username: String!, password: String!): Token
        createCustomerTokenOtp(username: String!, otp: String!): Token
        deleteCustomerToken: RevokeCustomerTokenOutput
      }
    `,
});

addMockFunctionsToSchema({ schema: customerSchema });

module.exports = customerSchema;
