import { Industry, SelectedIndustry } from '.';

export enum AppTypes {
	TOGGLE_AGNOSTIC = 'TOGGLE_AGNOSTIC',
	LOAD_INDUSTRIES_BEGIN = 'LOAD_INDUSTRIES_BEGIN',
	LOAD_INDUSTRIES_END = 'LOAD_INDUSTRIES_END',
	LOAD_INDUSTRIES_FAIL = 'LOAD_INDUSTRIES_FAIL',
	SELECT_INDUSTRY = 'SELECT_INDUSTRY',
	REMOVE_INDUSTRY = 'REMOVE_INDUSTRY',
	SELECT_EXCLUSION = 'SELECT_EXCLUSION',
	REMOVE_EXCLUSION = 'REMOVE_EXCLUSION',
	UPDATE_ITEM_ORDER = 'UPDATE_ITEM_ORDER',
	RESET_INDUSTRIES = 'RESET_INDUSTRIES',
	SEND_DATA_START = 'SEND_DATA_START',
	SEND_DATA_END = 'SEND_DATA_END',
	SEND_DATA_FAIL = 'SEND_DATA_FAIL',
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

interface SelectIndustryAction {
	type: AppTypes.SELECT_INDUSTRY,
	industry: Industry
}
export const selectIndustry = (industry: Industry): SelectIndustryAction => ({
	type: AppTypes.SELECT_INDUSTRY,
	industry,
});

export interface RemoveIndustryAction {
	type: AppTypes.REMOVE_INDUSTRY,
	industry: SelectedIndustry
}
export const removeIndustry = (industry: SelectedIndustry): RemoveIndustryAction => ({
	type: AppTypes.REMOVE_INDUSTRY,
	industry,
});

interface SelectExclusionAction {
	type: AppTypes.SELECT_EXCLUSION,
	industry: Industry
}
export const selectExclusion = (industry: Industry): SelectExclusionAction => ({
	type: AppTypes.SELECT_EXCLUSION,
	industry,
});
interface RemoveExclusionAction {
	type: AppTypes.REMOVE_EXCLUSION,
	industry: SelectedIndustry
}
export const removeExclusion = (industry: SelectedIndustry): RemoveExclusionAction => ({
	type: AppTypes.REMOVE_EXCLUSION,
	industry,
});

export interface UpdateItemOrderAction {
	type: AppTypes.UPDATE_ITEM_ORDER,
	updatedItems: SelectedIndustry[],
}
export const updateItemOrder = (updatedItems: SelectedIndustry[]): UpdateItemOrderAction => ({
	type: AppTypes.UPDATE_ITEM_ORDER,
	updatedItems,
});

interface ResetIndustriesAction {
	type: AppTypes.RESET_INDUSTRIES,
}
export const resetIndustries = (): ResetIndustriesAction => ({
	type: AppTypes.RESET_INDUSTRIES,
});

interface SendDataStartAction {
	type: AppTypes.SEND_DATA_START,
}
export const sendDataStart = (): SendDataStartAction => ({
	type: AppTypes.SEND_DATA_START,
});
interface SendDataEndAction {
	type: AppTypes.SEND_DATA_END,
	serverResponse: any,
}
export const sendDataEnd = (serverResponse: any): SendDataEndAction => ({
	type: AppTypes.SEND_DATA_END,
	serverResponse,
});
interface SendDataFailAction {
	type: AppTypes.SEND_DATA_FAIL,
}
export const sendDataFail = (): SendDataFailAction => ({
	type: AppTypes.SEND_DATA_FAIL,
});

export type AppActions =
	ToggleAgnosticAction |
	LoadIndustriesBeginAction |
	LoadIndustriesEndAction |
	LoadIndustriesFailAction |
	SelectIndustryAction |
	RemoveIndustryAction |
	UpdateItemOrderAction |
	SelectExclusionAction |
	RemoveExclusionAction |
	ResetIndustriesAction |
	SendDataStartAction |
	SendDataEndAction |
	SendDataFailAction;
