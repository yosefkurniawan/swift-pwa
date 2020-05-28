/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

const {
    ApolloServer,
    gql,
    introspectSchema,
    makeRemoteExecutableSchema,
} = require('apollo-server-express');
const cookieSession = require('cookie-session');
const express = require('express');
const next = require('next');
const fs = require('fs');
const http = require('http');
const https = require('https');
const fetch = require('cross-fetch');
const { print } = require('graphql');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const { graphqlEndpoint } = require('./swift.config');
const { decrypt } = require('./src/helpers/encryption');

const nextI18next = require('./src/lib/i18n');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

/* change the cerification files path as needed */
const privateKey = '/etc/letsencrypt/live/swiftpwa.testingnow.me/privkey.pem';
const certificate = '/etc/letsencrypt/live/swiftpwa.testingnow.me/cert.pem';

// const schema = require('./src/api');
// const root = require('./src/api/root');

const { expiredToken, SESSION_SECRET } = require('./swift.config');

(async () => {
    await app.prepare();
    const server = express();

    await nextI18next.initPromise;
    server.use(nextI18NextMiddleware(nextI18next));
    server.use(cookieSession({
        name: 'qwt-swift',
        keys: [SESSION_SECRET],
        maxAge: expiredToken,
    }));

    // make remote schema
    const fetcher = async ({
        query: queryDocument, variables, operationName, context,
    }) => {
        try {
            let token = '';
            if (context) {
                token = context.graphqlContext.session.token;
            }
            console.log('request token', token);
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

    const schema = makeRemoteExecutableSchema({
        schema: await introspectSchema(fetcher),
        fetcher,
    });

    // handle server graphql endpoint use `/graphql`
    const serverGraph = new ApolloServer({
        schema,
        context: ({ req }) => req,
        playground: {
            endpoint: '/graphql',
            settings: {
                'editor.theme': 'light',
            },
        },
        formatError: (err) => {
            if (err.message === 'graphql-authorization') {
                return {
                    message: err.message,
                    extensions: {
                        category: 'graphql-authorization',
                    },
                    status: 401,
                };
            }
            return err;
        },
    });
    serverGraph.applyMiddleware({ app: server });


    server.get('*', (req, res) => handle(req, res));

    if (
        process.env.NODE_ENV === 'production'
        && fs.existsSync(privateKey)
        && fs.existsSync(certificate)
    ) {
        const credentials = {
            key: fs.readFileSync(privateKey),
            cert: fs.readFileSync(certificate),
        };

        // https
        const httpsServer = https.createServer(credentials, server);
        await httpsServer.listen(3030);
        console.log('> Ready on https://localhost:3030'); // eslint-disable-line no-console

        // http
        const httpServer = http.createServer(server);
        await httpServer.listen(3000);
        console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
    } else {
        // http
        const httpServer = http.createServer(server);
        await httpServer.listen(3000);
        console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
    }
})();
