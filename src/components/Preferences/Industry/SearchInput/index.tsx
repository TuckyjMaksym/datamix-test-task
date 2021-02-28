/* eslint-disable react/prop-types */
// Modules
import React from 'react';
import { string, bool, oneOf } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Select, { SelectItemRenderer, SelectRenderer } from 'react-dropdown-select';
import { Chip, Icon } from 'react-materialize';

// Styles
import './SearchInput.css';

// Images
import searchIcn from '../../../../assets/search_icn.svg';

// Interfaces
import { RootState } from '../../../../reducers';

// Store
import * as appTypes from '../../../../reducers/app/types';
import { Industry, IndustryType, SelectedIndustry } from '../../../../reducers/app';

interface SearchInputProps {
	id: string;
	type: IndustryType;
	label: string;
	disabled?: boolean;
	placeholder?: string;
}
type RenderInputProps = SelectRenderer<Industry> & { inputRef: React.RefObject<HTMLInputElement> };
const SearchInput = (props: SearchInputProps): JSX.Element => {
	const dispatch = useDispatch();
	const maxItemsToShowInDropdown = 7;

	// Redux state
	const {
		industries,
		selectedIndustries,
		selectedExclusions,
	} = useSelector((state: RootState) => state.app);

	// State
	const [searchText, setSearchText] = React.useState('');

	const {
		id,
		type,
		label,
		disabled,
		placeholder,
	} = props;
	const isIndustryType = type === IndustryType.industry;
	const isExclusionType = type === IndustryType.exclusion;

	// Handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { value } } = e;

		setSearchText(value);
	};
	const handleItemClick = (item: Industry) => {
		if (isIndustryType) {
			dispatch(appTypes.selectIndustry(item));
		} else {
			dispatch(appTypes.selectExclusion(item));
		}
		setSearchText('');
	};

	// Elements
	const renderItem = (props: SelectItemRenderer<Industry>) => {
		const { item } = props;

		return (
			<div key={item.id} className="dropdown__item">
				<button
					type="button"
					onClick={() => handleItemClick(item)}
					className="dropdown__btn"
				>
					{item.title}
				</button>
			</div>
		);
	};
	const renderInput = (props: RenderInputProps): JSX.Element => {
		const { inputRef } = props;
		let wrapperClasses = 'search__input__wrapper';

		if (isExclusionType) {
			wrapperClasses += ' search__input__wrapper--exclusion';
		}
		return (
			<>
				<div className="search__icon">
					<img src={searchIcn} alt="Search" />
				</div>
				<div className={wrapperClasses}>
					<input
						ref={inputRef}
						id={id}
						disabled={disabled}
						value={searchText}
						className="search__input font-14"
						placeholder={placeholder}
						onChange={handleChange}
						autoComplete="off"
					/>
				</div>
			</>
		);
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const renderOption = (args: SelectItemRenderer<any>) => {
		const industry: SelectedIndustry = args.item;
		const closeIcon = (
			<Icon className="close" onClick={() => dispatch(appTypes.removeExclusion(industry))}>
				close
			</Icon>
		);

		return (
			<div className="input__tag__wrapper flex-row">
				<Chip
					close
					closeIcon={closeIcon}
					className="input__tag flex-row"
				>
					<p className="text-ellipsis">
						{args.item.title}
					</p>
				</Chip>
			</div>
		);
	};

	let foundIndustries: Industry[] = [];

	if (searchText) {
		foundIndustries = industries.filter((industry) => {
			const title = industry.title.trim().toLowerCase();
			const text = searchText.toLowerCase();
			const textMatch = title.startsWith(text);
	
			if (!textMatch) {
				// Filter items which "title" doesn't match searched text
				// Don't need to make additional checks
				return false;
			}
			// If text match, check whether item is already selected as industry
			const alreadySelectedAsIndustry = !!selectedIndustries.find((item) => item.id === industry.id);
	
			if (alreadySelectedAsIndustry) {
				// Alread selected as industry
				return false;
			}
			const alreadySelectedAsExclusion = !!selectedExclusions.find((item) => item.id === industry.id);
	
			return !alreadySelectedAsExclusion;
		});
	}
	if (foundIndustries.length > maxItemsToShowInDropdown) {
		foundIndustries = foundIndustries.slice(0, maxItemsToShowInDropdown - 1);
	}
	const values = isExclusionType ? selectedExclusions : [];
	const selectClasses = `input__select search__${type}`;
	let labelClasses = 'flex-column';

	if (disabled) {
		labelClasses += ' input__label--disabled';
	}
	return (
		<label htmlFor={id} className={labelClasses}>
			{label}
			<Select
				multi
				searchable
				closeOnSelect
				disabled={disabled}
				dropdownHandle={false}
				backspaceDelete={false}
				dropdownGap={-2}
				labelField="title"
				className={selectClasses}
				values={values}
				options={foundIndustries}
				itemRenderer={renderItem}
				inputRenderer={renderInput}
				optionRenderer={renderOption}
				onChange={() => true}
				noDataRenderer={() => <></>}
			/>
		</label>
	);
};

SearchInput.propTypes = {
	// String
	placeholder: string,
	id: string.isRequired,
	label: string.isRequired,
	
	// One of values
	type: oneOf([IndustryType.exclusion, IndustryType.industry]).isRequired,

	// Boolean
	disabled: bool,
};

SearchInput.defaultProps = {
	placeholder: '',
	disabled: false,
};

export { SearchInput };
