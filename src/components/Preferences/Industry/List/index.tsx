// Modules
import React from 'react';
import { useDispatch } from 'react-redux';
import {
	Droppable,
	Draggable,
	DragDropContext,
	DraggableProvided,
	DroppableProvided,
} from 'react-beautiful-dnd';

// Styles
import './List.css';

// Images
import removeIcn from '../../../../assets/remove_industry_icn.svg';

// Store
import { IndustryType, SelectedIndustry } from '../../../../reducers/app';
import { removeIndustry } from '../../../../reducers/app/types';
import { handleDragEnd } from '../../../../reducers/app/thunks';

// Interfaces
interface ListProps {
	items: SelectedIndustry[],
	disabled: boolean,
}

export const List = (props: ListProps): JSX.Element => {
	const dispatch = useDispatch();

	const { items, disabled } = props;
	const orderedItems = items.sort((a, b) => a.order - b.order);
	const removeItem = (item: SelectedIndustry): void => {
		dispatch(removeIndustry(item));
	};
	const renderDraggableItem = (provided: DraggableProvided, item: SelectedIndustry) => {
		let listItemClasses = 'industry__item flex-row';

		if (disabled) {
			listItemClasses += ' industry__item--disabled';
		}
		return (
			<li
				ref={provided.innerRef}
				className={listItemClasses}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
			>
				<div className="drag__icon flex-row">
					<div className="drag__square" />
					<div className="drag__square" />
					<div className="drag__square" />
					<div className="drag__square" />
					<div className="drag__square" />
					<div className="drag__square" />
				</div>
				<p className="industry__name">
					{item.title}
				</p>
				<button
					className="industry__remove flex-row"
					onClick={() => removeItem(item)}
				>
					<img src={removeIcn} alt="Remove industry" />
				</button>
			</li>
		);
	};
	const industriesListStyle: React.CSSProperties = {};

	if (items.length <= 2) {
		industriesListStyle.width = '100%';
	}
	const renderDroppableContainer = (provided: DroppableProvided) => (
		<ul
			className="industries__list"
			style={industriesListStyle}
			ref={provided.innerRef}
			{...provided.droppableProps}
		>
			{orderedItems.map((item, index) => (
				<Draggable
					key={item.id}
					index={index}
					draggableId={item.id}
					isDragDisabled={disabled}
				>
					{(draggableProvided) => renderDraggableItem(draggableProvided, item)}
				</Draggable>
			))}
			{provided.placeholder}
		</ul>
	);

	return (
		<DragDropContext onDragEnd={(result) => dispatch(handleDragEnd(result))}>
			<Droppable
				isDropDisabled={disabled}
				droppableId={IndustryType.industry}
			>
				{renderDroppableContainer}
			</Droppable>
		</DragDropContext>
	);
};
