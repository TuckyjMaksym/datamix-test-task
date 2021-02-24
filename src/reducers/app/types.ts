import { Industry } from '.';

export enum AppTypes {
	TOGGLE_AGNOSTIC = 'TOGGLE_AGNOSTIC',
	LOAD_INDUSTRIES_BEGIN = 'LOAD_INDUSTRIES_BEGIN',
	LOAD_INDUSTRIES_END = 'LOAD_INDUSTRIES_END',
	LOAD_INDUSTRIES_FAIL = 'LOAD_INDUSTRIES_FAIL',
}

interface ToggleAgnosticAction {
	type: AppTypes.TOGGLE_AGNOSTIC,
}
export const toggleAgnostic = (): ToggleAgnosticAction => ({
	type: AppTypes.TOGGLE_AGNOSTIC,
});

interface LoadIndustriesBeginAction {
	type: AppTypes.LOAD_INDUSTRIES_BEGIN,
}
export const loadIndustriesBegin = (): LoadIndustriesBeginAction => ({
	type: AppTypes.LOAD_INDUSTRIES_BEGIN,
});
interface LoadIndustriesEndAction {
	type: AppTypes.LOAD_INDUSTRIES_END,
	industries: Industry[],
}
export const loadIndustriesEnd = (industries: Industry[]): LoadIndustriesEndAction => ({
	type: AppTypes.LOAD_INDUSTRIES_END,
	industries,
});
interface LoadIndustriesFailAction {
	type: AppTypes.LOAD_INDUSTRIES_FAIL,
}
export const loadIndustriesFail = (): LoadIndustriesFailAction => ({
	type: AppTypes.LOAD_INDUSTRIES_FAIL,
});

export type AppActions =
	ToggleAgnosticAction |
	LoadIndustriesBeginAction |
	LoadIndustriesEndAction |
	LoadIndustriesFailAction;