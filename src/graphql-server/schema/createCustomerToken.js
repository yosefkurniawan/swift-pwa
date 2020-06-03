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

      input internalCreateCustomerTokenInput {
        firstname: String, 
        lastname: String,
        email: String,
        password: String,
        phonenumber: String,
        is_subscribed: Boolean,
        otp: String,
      }
      
      type Mutation {
        internalGenerateCustomerToken(username: String!, password: String!): Token
        internalCreateCustomerToken(input: internalCreateCustomerTokenInput): Token
        internalCreateCustomerTokenOtp(username: String!, otp: String!): Token
        internalDeleteCustomerToken: RevokeCustomerTokenOutput
      }
    `,
});

addMockFunctionsToSchema({ schema: customerSchema });

module.exports = customerSchema;
