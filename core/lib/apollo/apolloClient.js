/* eslint-disable import/no-extraneous-dependencies */
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from 'apollo-link-retry';
import fetch from 'isomorphic-unfetch';
import { graphqlEndpoint, HOST } from '@root/swift.config.js';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { removeCartId } from '@helper_cartid';
import { removeIsLoginFlagging } from '@helper_auth';
import getConfig from 'next/config';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [],
        },
    },
});

const uri = (typeof publicRuntimeConfig !== 'undefined' && graphqlEndpoint[publicRuntimeConfig.appEnv])
    ? graphqlEndpoint[publicRuntimeConfig.appEnv] : graphqlEndpoint.dev;

const host = (typeof publicRuntimeConfig !== 'undefined' && HOST[publicRuntimeConfig.appEnv])
    ? HOST[publicRuntimeConfig.appEnv] : HOST.dev;

const uriInternal = `${host}/graphql`;
// handle if token expired
const logoutLink = onError((err) => {
    const { graphQLErrors, networkError } = err;
    if (networkError && typeof window !== 'undefined' && graphQLErrors && graphQLErrors.length > 0 && graphQLErrors[0].status > 500) {
        window.location.href = '/maintenance';
    } else if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].status === 401 && typeof window !== 'undefined') {
        removeCartId();
        removeIsLoginFlagging();
        // reference https://stackoverflow.com/questions/10339567/javascript-clear-cache-on-redirect
        window.location.href = `/customer/account/login?n=${new Date().getTime()}`;
    }
});

const link = new RetryLink().split(
    (operation) => operation.getContext().request === 'internal',
    new HttpLink({
        uri: uriInternal, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
    }),
    new HttpLink({
        uri, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
        useGETForQueries: true,
    }),
);

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: logoutLink.concat(link),
        cache: new InMemoryCache({ fragmentMatcher }).restore(initialState),
        // reference https://www.apollographql.com/docs/react/development-testing/developer-tooling/#apollo-client-devtools
        // eslint-disable-next-line no-underscore-dangle
        connectToDevTools: typeof window !== 'undefined' && window.__APOLLO_CLIENT__
        && (typeof publicRuntimeConfig !== 'undefined' && publicRuntimeConfig.appEnv === 'local'),
        resolvers: {},
    });
}
