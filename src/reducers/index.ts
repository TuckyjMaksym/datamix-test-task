import { combineReducers } from 'redux';

// Reducers
import { app, AppState } from './app';

export interface RootState {
	app: AppState,
}

export default combineReducers({
	app
});