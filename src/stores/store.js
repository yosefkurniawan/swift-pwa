/* eslint-disable import/prefer-default-export */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxLogger from 'redux-logger';
import { exampleReducer } from '@pages/example/test-apollo-redux/redux/reducers';

const initialStates = {
    // put another initial states here
};

const reducers = combineReducers({
    exampleReducer,
    // put another reducers here
});

const middlewares = applyMiddleware(reduxLogger);

export const initializeStore = (preloadedState = initialStates) => createStore(
    reducers,
    preloadedState,
    composeWithDevTools(middlewares),
);
