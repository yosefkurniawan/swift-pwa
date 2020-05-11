const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');

const { gql } = require('apollo-server-express');


const cartSchema = makeExecutableSchema({
    typeDefs: gql`
      type Token {
        token: String,
        message: String
      }
      
      type Query {
        generateCustomerToken: Token
      }
      
      type Mutation {
        createCustomerToken(email: String, password: String): Token
      }
    `,
});

addMockFunctionsToSchema({ schema: cartSchema });

module.exports = cartSchema;
