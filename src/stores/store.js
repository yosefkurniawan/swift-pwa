import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import { exampleReducer, initExampleState } from "@pages/example/test-apollo-redux/redux/reducers";
import { quoteReducer, initQuoteState } from "@pages/checkout/redux/reducers/quoteReducer";

const initialStates = {
    ...initExampleState,
    ...initQuoteState,
    // put another initial states here
};

const reducers = combineReducers({
    exampleReducer,
    quoteReducer,
    // put another reducers here
});

const middlewares = applyMiddleware(reduxLogger);

export const initializeStore = (preloadedState = initialStates) => {
    return createStore(
        reducers,
        preloadedState,
        composeWithDevTools(middlewares)
    );
};
