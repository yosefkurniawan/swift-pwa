/* eslint-disable import/no-extraneous-dependencies */
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { graphqlEndpoint } from '@root/swift.config.js';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [],
        },
    },
});

const uri = process.env.NODE_ENV === 'production'
    ? graphqlEndpoint.prod
    : graphqlEndpoint.dev;

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
            uri, // Server URL (must be absolute)
            credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
            fetch,
        }),
        cache: new InMemoryCache({ fragmentMatcher }).restore(initialState),
        connectToDevTools: true,
    });
}
