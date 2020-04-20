/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Provider } from 'react-redux';
import { initializeStore } from '@stores/store';
import reducers from '@stores/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import Loading from '@material-ui/core/LinearProgress';
import App from 'next/app';

export const withRedux = (PageComponent, { ssr = true, LoadComponent = Loading } = {}) => {
    const WithRedux = ({ initialReduxState, ...props }) => {
        const store = getOrInitializeStore(initialReduxState);
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<LoadComponent {...props} />}
                    persistor={persistStore(store)}
                >
                    <PageComponent {...props} />
                </PersistGate>
            </Provider>
        );
    };

    // Make sure people don't use this HOC on _app.js level
    if (process.env.NODE_ENV !== 'production') {
        const isAppHoc = PageComponent === App || PageComponent.prototype instanceof App;
        if (isAppHoc) {
            throw new Error('The withRedux HOC only works with PageComponents');
        }
    }

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
        const displayName = PageComponent.displayName || PageComponent.name || 'Component';

        WithRedux.displayName = `withRedux(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
        WithRedux.getInitialProps = async (context) => {
            // Get or Create the store with `undefined` as initialState
            // This allows you to set a custom default initialState
            const reduxStore = getOrInitializeStore();

            // Provide the store to getInitialProps of pages
            // eslint-disable-next-line no-param-reassign
            context.reduxStore = reduxStore;

            // Run getInitialProps from HOCed PageComponent
            const pageProps = typeof PageComponent.getInitialProps === 'function'
                ? await PageComponent.getInitialProps(context)
                : {};

            // Pass props to PageComponent
            return {
                ...pageProps,
                initialReduxState: reduxStore.getState(),
            };
        };
    }

    return WithRedux;
};

const persistConfig = {
    key: 'nextjs',
    whitelist: ['config'],
    storage,
};

let reduxStore;
const getOrInitializeStore = (initialState) => {
    // Always make a new store if server, otherwise state is shared between requests
    if (typeof window === 'undefined') {
        return initializeStore(initialState);
    }

    // Create store if unavailable on the client and set it on the window object
    if (!reduxStore) {
        reduxStore = initializeStore(initialState, persistReducer(persistConfig, reducers));
    }

    return reduxStore;
};
