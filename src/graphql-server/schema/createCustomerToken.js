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
        internalCreateCustomerToken(username: String!, password: String!): Token
        internalCreateCustomerTokenOtp(username: String!, otp: String!): Token
        internalDeleteCustomerToken: RevokeCustomerTokenOutput
      }
    `,
});

addMockFunctionsToSchema({ schema: customerSchema });

module.exports = customerSchema;
