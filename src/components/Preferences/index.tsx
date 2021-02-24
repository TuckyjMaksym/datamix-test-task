// Modules
import React, { useState } from 'react';
import { Button, CardPanel } from 'react-materialize';

// Styles
import 'simplebar/dist/simplebar.min.css';
import './Preferences.css';

// Components
import { PreferencesPanel } from '../presentational/PreferencesPanel';
import { Industry } from './Industry';

const buttons = [
	{ key: 'industry', text: 'Industry focus' },
	{ key: 'geographic', text: 'Geographic focus' },
	{ key: 'stage', text: 'Stage focus' },
	{ key: 'other', text: 'Other preferences' },
];
const Preferences = (): JSX.Element => {
	const [selectedTab, setSelectedTab] = useState('industry');

	const renderTab = () => {
		switch (selectedTab) {
		case 'industry': return <Industry />;

		default: return null;
		}
	};

	return (
		<main className="preferences flex-row">
			<CardPanel className="preferences__content row">
				<div className="tabs__container row">
					{buttons.map(({ key, text }) => (
						<Button
							key={key}
							onClick={() => setSelectedTab(key)}
							className={`tab__btn col l3 ${key === selectedTab ? 'tab__btn--selected' : ''} `}
						>
							{text}
						</Button>
					))}
				</div>
				{renderTab()}
			</CardPanel>
			<PreferencesPanel />
		</main>
	);
};

export default Preferences;
