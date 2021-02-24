import { applyMiddleware, Store, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

const configureStore = (preloadedState = {}): Store => {
	const logger = createLogger();
	const middlewares = [thunkMiddleware, logger];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const store = createStore(rootReducer, preloadedState, middlewareEnhancer);

	return store;
};

export default configureStore;
