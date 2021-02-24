// Modules
import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

// Styles
import './App.css';

// Components
import Preferences from './components/Preferences';

export const App = (): JSX.Element => {
	return (
		<div className='App flex-column'>
			<h2>
				My preferences
			</h2>
			<Preferences />
		</div>
	);
};
