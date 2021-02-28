// Modules
import { DropResult } from 'react-beautiful-dnd';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { generate as generateShortId } from 'shortid';

// Types
import * as types from './types';

// Interfaces
import { Industry } from '.';
import { RootState } from '..';

type Thunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const loadIndustries = (): Thunk => async (dispatch) => {
	try {
		dispatch(types.loadIndustriesBegin());
		const url = 'https://jsonplaceholder.typicode.com/todos';

		const industries: Industry[] = await fetch(url).then((response) => response.json());
		// Update received industries by generating new id via "shortid" module
		const orderedIndustries = industries.map(({ title }) => ({ title, id: generateShortId() }));

		dispatch(types.loadIndustriesEnd(orderedIndustries));
	} catch (error) {
		console.error('Failed to load industries', error);
		dispatch(types.loadIndustriesFail());
	}
};

export const handleDragEnd = (result: DropResult): Thunk => (dispatch, getState) => {
	try {
		const {
			app: { selectedIndustries }
		} = getState();
		const items = selectedIndustries;

		switch (result.reason) {
		case 'DROP': {
			const {
				source: {
					index: prevOrder,
				},
				destination,
				draggableId,
			} = result;

			if (typeof destination?.index !== 'number') {
				console.error('Didn\'t receive any index in "destination". Cannot update industry order');
				return;
			}
			const { index: newOrder } = destination;

			// We need to find dropped item by received "draggableId" and update its "order" property.
			// Also update other items respectively based on where item was dragged to
			const updatedItems = items.map((industry) => {
				const updatedIndustry = { ...industry };
	
				if (industry.id === draggableId) {
					updatedIndustry.order = newOrder;
				} else if (
					prevOrder < newOrder &&
					industry.order <= newOrder &&
					industry.order > prevOrder
				) {
					// If item was dragged "down", decrease "order" by 1 for all items
					// between "new"(including) and "old"(not including) positions
					updatedIndustry.order -= 1;
				} else if (
					prevOrder > newOrder &&
					industry.order >= newOrder &&
					industry.order < prevOrder
				) {
					// If item was dragged "up", increase "order" by 1 for all items
					// between "new"(including) and "old"(not including) positions
					updatedIndustry.order += 1;
				}
			
				return updatedIndustry;
			});

			dispatch(types.updateItemOrder(updatedItems));
			break;
		}

		default:
			console.error(`Unhandled drag reason received: ${result.reason}`);
		}
	} catch (error) {
		console.error('Failed to update item order', error);
	}
};

export const sendDataToServer = (): Thunk => async (dispatch, getState) => {
	try {
		const {
			app: {
				isAgnostic,
				selectedIndustries,
				selectedExclusions,
			}
		} = getState();
		dispatch(types.sendDataStart());
		const options = {
			method: 'POST',
			body: JSON.stringify({
				isAgnostic,
				selectedIndustries,
				selectedExclusions,
			})
		};
		await new Promise((resolve) => {
			setTimeout(resolve, 500);
		});
		const response = await fetch('/', options);

		if (response.status === 200) {
			const responseData = await response.json();

			dispatch(types.sendDataEnd(responseData));
			dispatch(types.resetIndustries());
		} else {
			console.error(`Request failed with status "${response.status}"`);
			dispatch(types.sendDataFail());
		}
	} catch (error) {
		console.error('Failed to send data to server', error);
		dispatch(types.sendDataFail());
	}
};
