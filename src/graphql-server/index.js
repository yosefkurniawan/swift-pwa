/* eslint-disable no-param-reassign */
const fetch = require('cross-fetch');
const { print } = require('graphql');
const { graphqlEndpoint } = require('../../swift.config');
const { decrypt } = require('../helpers/encryption');


// make remote schema
const fetcher = async ({
    query: queryDocument, variables, operationName, context,
}) => {
    try {
        let token = '';
        if (context) {
            token = context.graphqlContext.session.token;
            console.log('request token', decrypt(token));
        }
        const query = print(queryDocument);
        const fetchResult = await fetch(process.env.NODE_ENV === 'production' ? graphqlEndpoint.prod : graphqlEndpoint.dev, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${decrypt(token)}` : '',
            },
            body: JSON.stringify({ query, variables, operationName }),
        });
        const response = await fetchResult.json();
        // console.log(response);
        if (response.errors) {
            const err = response.errors[0];
            if (err.extensions.category === 'graphql-authorization') {
                return {
                    errors: [
                        {
                            message: err.extensions.category,
                            extensions: err.extensions,
                        },
                    ],
                    data: response.data,
                };
            }
        }
        return response;
    } catch (error) {
        return error;
    }
};

module.exports = fetcher;
