/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxLogger from 'redux-logger';

import reducers from './reducers';

const initialStates = {
    // put another initial states here
};

const middlewares = applyMiddleware(reduxLogger);

export const initializeStore = (preloadedState = initialStates, customReducer = reducers) => createStore(
    customReducer,
    preloadedState,
    composeWithDevTools(middlewares),
);
