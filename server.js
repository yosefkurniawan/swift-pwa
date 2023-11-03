/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */

const { ApolloServer } = require('apollo-server-express');
const cookieSession = require('cookie-session');
const express = require('express');
const next = require('next');
const http = require('http');
const blocker = require('express-user-agent-blocker');
const fs = require('fs');
// const { parse } = require('url');

const LRUCache = require('lru-cache');
const cookieParser = require('cookie-parser');
const remoteSchema = require('./core/api/graphql');
const nextI18next = require('./core/lib/i18n');
const { basePath } = require('./swift.config');

const { json } = express;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const {
    expiredToken, nossrCache, features,
} = require('./swift.config');

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
    max: 100 * 1024 * 1024 /* cache size will be 100 MB using `return n.length` as length() function */,
    // eslint-disable-next-line no-unused-vars
    length(n, key) {
        return n.length;
    },
    maxAge: 1000 * 60 * 60 * 24, // create max age 1 day
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
    return `${req.path}`;
}

async function renderAndCache(req, res) {
    const key = getCacheKey(req);
    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key) && typeof req.query.resetcache === 'undefined') {
        res.setHeader('x-cache', 'HIT');
        res.send(ssrCache.get(key));
        return;
    }

    // reset cache if have query resetcache
    if (req.query && typeof req.query.resetcache !== 'undefined') {
        ssrCache.reset();
    }

    try {
        // If not let's render the page into HTML
        const html = await app.renderToHTML(req, res, req.path, req.query);

        // Something is wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
            res.send(html);
            return;
        }
        // Let's cache this page
        ssrCache.set(key, html);

        res.setHeader('x-cache', 'MISS');
        res.send(html);
    } catch (err) {
        app.renderError(err, req, res, req.path, req.query);
    }
}

(async () => {
    const botList = fs.readFileSync('./botlist.txt').toString().split('\n').filter(Boolean);

    await app.prepare();
    const server = express();

    // block bot
    server.use(blocker(botList, { text: 'Unauthorized request' }));

    server.use(cookieParser());
    // disable x-powered-by
    server.disable('x-powered-by');
    // if ssr cache on

    await nextI18next.initPromise;
    // server.use(nextI18NextMiddleware(nextI18next));

    server.use(
        cookieSession({
            name: 'qwt-swift',
            keys: [process.env.SESSION_SECRET],
            maxAge: expiredToken,
            // add security options
            cookies: {
                secure: true,
                httpOnly: true,
            },
        }),
    );

    server.use(json({ limit: '2mb' }));

    const schemas = await remoteSchema();
    // handle server graphql endpoint use `/graphql`
    const serverGraph = new ApolloServer({
        schema: schemas,
        context: ({ req }) => req,
        playground: false,
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
    // serverGraph.applyMiddleware({ app: server,  });
    serverGraph.applyMiddleware({ app: server, path: `${basePath}/graphql` });

    // server.get('*', (req, res) => handle(req, res));
    server.get('*', (req, res) => {
        const key = getCacheKey(req);
        // handle no cache ssr
        const found = nossrCache.find((val) => val === key);
        if (found || !features.ssrCache) {
            return handle(req, res);
        }
        /* serving page */
        return renderAndCache(req, res);
    });

    // create server
    const httpServer = http.createServer(server);
    await httpServer.listen(3000);
    console.log(`> Ready on http://localhost:3000${basePath}`); // eslint-disable-line no-console
})();
