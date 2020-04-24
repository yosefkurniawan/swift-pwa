import { combineReducers } from 'redux';

import { exampleReducer } from '@pages/example/test-apollo-redux/redux/reducers';
import config from './config';
import cart from './cart';

const reducers = combineReducers({
    exampleReducer,
    config,
    cart,
    // put another reducers here
});

export default reducers;
