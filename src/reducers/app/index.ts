
import { AppTypes as types } from './types';
import * as actions from './types';

export interface Industry {
	id: number;
	title: string;
}
export interface AppState {
	isAgnostic: boolean,
	isLoadingIndustries: boolean,
	industries: Industry[],
}

const initialState: AppState = {
	isAgnostic: false,
	isLoadingIndustries: false,
	industries: [],
};

const app = (state = initialState, action: actions.AppActions): AppState => {
	switch (action.type) {
	case types.TOGGLE_AGNOSTIC: {
		const { isAgnostic } = state;

		return { ...state, isAgnostic: !isAgnostic };
	}

	case types.LOAD_INDUSTRIES_BEGIN:
		return { ...state, isLoadingIndustries: true };
	case types.LOAD_INDUSTRIES_END:
		return {
			...state,
			industries: action.industries,
			isLoadingIndustries: false,
		};
	case types.LOAD_INDUSTRIES_FAIL:
		return { ...state, isLoadingIndustries: false };

	default:
		return state;
	}
};

export { app };
