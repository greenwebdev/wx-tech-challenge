import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import productsReducer from 'modules/products';
import cartReducer from 'modules/cart';

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(thunk),
    ...enhancers
);

export default createStore(combineReducers({
        products: productsReducer,
        cart: cartReducer
    }), 
    composedEnhancers
);
