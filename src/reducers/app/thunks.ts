import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Industry } from '.';
import { RootState } from '..';
import * as types from './types';

type Thunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const loadIndustries = (): Thunk => async (dispatch) => {
	try {
		dispatch(types.loadIndustriesBegin());
		const url = 'https://jsonplaceholder.typicode.com/todos';

		const industries: Industry[] = await fetch(url).then((response) => response.json());

		dispatch(types.loadIndustriesEnd(industries));
	} catch (error) {
		console.error('Failed to load industries', error);
		dispatch(types.loadIndustriesFail());
	}
};
