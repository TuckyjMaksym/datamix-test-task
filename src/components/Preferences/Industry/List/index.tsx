// Modules
import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Industry } from '../../../../reducers/app';

// Styles
import './List.css';

// Images
import removeIcn from '../../../../assets/remove_industry_icn.svg';

interface ListProps {
	industries: Industry[],
}

interface SortableItemProps {
	item: Industry,
}
const SortableItem = SortableElement((props: SortableItemProps) => {
	const { item } = props;

	return (
		<li className="industry__item flex-row">
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
			<button className="industry__remove flex-row">
				<img src={removeIcn} alt="Remove industry" />
			</button>
		</li>
	);
});
interface SortableContainerProps {
	items: Industry[],
}
const SortableList = SortableContainer((props: SortableContainerProps) => {
	const { items } = props;

	return (
		<ul className="industries__list">
			{items.map((item, index) => (
				<SortableItem key={item.id} index={index} item={item} />
			))}
		</ul>
	);
});
export const List = (props: ListProps): JSX.Element => {
	const { industries } = props;

	return <SortableList items={industries} />;
};
