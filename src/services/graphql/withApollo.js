import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { graphqlEndpoint } from '../../../swift.config.js';

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            uri: graphqlEndpoint,
            cache: new InMemoryCache().restore(initialState || {})
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);