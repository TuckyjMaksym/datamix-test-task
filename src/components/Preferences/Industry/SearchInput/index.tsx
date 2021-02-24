// Modules
import React from 'react';
import { string, bool } from 'prop-types';

// Styles
import './SearchInput.css';

// Images
import searchIcn from '../../../../assets/search_icn.svg';

interface SearchInputProps {
	id: string;
	label: string;
	disabled?: boolean;
	placeholder?: string;
}
const SearchInput = (props: SearchInputProps): JSX.Element => {
	// State
	const [focused, setFocused] = React.useState(false);

	// Refs
	const input = React.useRef(null);

	const { label, id, placeholder } = props;
	let wrapperClasses = 'search__input__wrapper';

	if (focused) {
		wrapperClasses += ' search__input__wrapper--focused';
	}
	return (
		<label htmlFor={id} className="flex-column">
			{label}
			<div className={wrapperClasses}>
				<div className="search__icon">
					<img src={searchIcn} alt="Search" />
				</div>
				<input
					ref={input}
					className="search__input font-14"
					id={id}
					placeholder={placeholder}
					type="search"
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
				<div className="industries__dropdown__wrapper">
				</div>
			</div>
		</label>
	);
};

SearchInput.propTypes = {
	// String
	placeholder: string,
	id: string.isRequired,
	label: string.isRequired,

	// Boolean
	disabled: bool,
};

SearchInput.defaultProps = {
	placeholder: '',
	disabled: false,
};

export { SearchInput };
