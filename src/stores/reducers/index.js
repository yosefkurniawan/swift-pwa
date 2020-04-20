import { combineReducers } from 'redux';

import { exampleReducer } from '@pages/example/test-apollo-redux/redux/reducers';
import config from './config';

const reducers = combineReducers({
    exampleReducer,
    config,
    // put another reducers here
});

export default reducers;
