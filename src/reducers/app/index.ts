
import { AppTypes as types } from './types';
import * as actions from './types';

export interface Industry {
	id: string;
	title: string;
}
export interface SelectedIndustry extends Industry {
	order: number;
}
export enum IndustryType {
	industry = 'industry',
	exclusion = 'exclusion',
}
export interface AppState {
	isAgnostic: boolean,
	isSendingData: boolean,
	isLoadingIndustries: boolean,
	industries: Industry[],
	selectedIndustries: SelectedIndustry[],
	selectedExclusions: SelectedIndustry[],
	serverResponse: any,
}

const initialState: AppState = {
	isAgnostic: false,
	isSendingData: false,
	isLoadingIndustries: false,
	serverResponse: null,
	industries: [],
	selectedIndustries: [],
	selectedExclusions: [],
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

	case types.SELECT_INDUSTRY: {
		const { selectedIndustries } = state;
		const newIndustry = {
			...action.industry,
			order: selectedIndustries.length,
		};

		return { ...state, selectedIndustries: [...selectedIndustries, newIndustry] };
	}
	case types.REMOVE_INDUSTRY: {
		const { selectedIndustries } = state;
		const updatedIndustries: SelectedIndustry[] = [];

		selectedIndustries
			.forEach((item) => {
				const updatedItem = { ... item };

				if (item.id !== action.industry.id) {
					if (item.order > action.industry.order) {
						updatedItem.order -= 1;
					}
					updatedIndustries.push(updatedItem);
				}
			});
		return { ...state, selectedIndustries: updatedIndustries };
	}
	case types.SELECT_EXCLUSION: {
		const { selectedExclusions } = state;
		const newExclusion = {
			...action.industry,
			order: selectedExclusions.length,
		};

		return { ...state, selectedExclusions: [...selectedExclusions, newExclusion] };
	}
	case types.REMOVE_EXCLUSION: {
		const { selectedExclusions } = state;
		const updatedExclusions: SelectedIndustry[] = [];

		selectedExclusions
			.forEach((item) => {
				const updatedItem = { ... item };

				if (item.id !== action.industry.id) {
					if (item.order > action.industry.order) {
						updatedItem.order -= 1;
					}
					updatedExclusions.push(updatedItem);
				}
			});

		return { ...state, selectedExclusions: updatedExclusions };
	}

	case types.UPDATE_ITEM_ORDER: {
		const nextState = { ...state };

		nextState.selectedIndustries = action.updatedItems;
		return nextState;
	}

	case types.RESET_INDUSTRIES:
		return { ...state, selectedIndustries: [], selectedExclusions: [] };

	case types.SEND_DATA_START:
		return { ...state, isSendingData: true };
	case types.SEND_DATA_END:
		return { ...state, isSendingData: false, serverResponse: action.serverResponse };
	case types.SEND_DATA_FAIL:
		return { ...state, isSendingData: false };

	default:
		return state;
	}
};

export { app };
