import { combineReducers } from 'redux';

import { exampleReducer } from '@pages/example/test-apollo-redux/redux/reducers';
import { productReducer } from '@pages/catalog/pages/product/redux/reducer';
import config from './config';
import cart from './cart';

const reducers = combineReducers({
    exampleReducer,
    config,
    cart,
    product: productReducer,
    // put another reducers here
});

export default reducers;
