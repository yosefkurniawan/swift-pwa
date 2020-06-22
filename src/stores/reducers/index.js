import { combineReducers } from 'redux';

import { exampleReducer } from '@pages/example/test-apollo-redux/redux/reducers';
import { productReducer } from '@pages/slug/pages/product/redux/reducer';
import config from './config';
import cart from './cart';
import common from './common';

const reducers = combineReducers({
    exampleReducer,
    config,
    cart,
    common,
    product: productReducer,
    // put another reducers here
});

export default reducers;
