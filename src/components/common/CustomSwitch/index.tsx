// Modules
import React from 'react';
import { bool, func, string } from 'prop-types';

// Styles
import './CustomSwitch.css';

interface SwitchProps {
	checked: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	className?: string;
}
const CustomSwitch = (props: SwitchProps): JSX.Element => {
	const { checked, onClick, className } = props;
	let classes = 'custom__switch';

	if (className) {
		classes += ` ${className}`;
	}
	if (checked) {
		classes += ' custom__switch--active';
	}
	return (
		<button className={classes} onClick={onClick}>
			<div className="custom__switch__bg">
				<div className="custom__switch__dot" />
			</div>
		</button>
	);
};

CustomSwitch.propTypes = {
	// Boolean
	checked: bool.isRequired,

	// Function
	onClick: func.isRequired,

	// String
	className: string,
};
CustomSwitch.defaultProps = {
	className: '',
};

export { CustomSwitch };
