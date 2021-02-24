// Modules
import React from 'react';
import { CardPanel } from 'react-materialize';
import SimpleBar from 'simplebar-react';

// Assets
import footprintIcn from '../../assets/footprint.svg';

const PreferencesPanel = (): JSX.Element => {
	return (
		<CardPanel className="info__panel flex-column">
			<div className="panel__header flex-row">
				<img src={footprintIcn} alt="Assistant" />
				<p>
					Personal Intelligent Assistant
				</p>
			</div>
			<SimpleBar className="panel__body flex-column left-align">
				<span className="font-12">
					Best practices
				</span>
				<p className="matching-preferences font-16 semi-bold">
					Matching preferences
				</p>
				<p className="font-14">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus fermentum risus, sit amet fringilla nunc pellentesque quis.
				</p>
				<div className="criteria flex-column">
					<span className="semi-bold">
						Matching criteria:
					</span>
					<ul className="panel__list">
						<li>Industries</li>
						<li>Investor</li>
						<li>Type and position</li>
						<li>Advanced options</li>
						<li>Ideal portrait</li>
					</ul>
				</div>
				<div className="reading flex-column">
					<span className="semi-bold">
						Further reading:
					</span>
					<ul className="panel__list">
						<li>
							<a className="reading__link" href="#">
								Knowledge base: article #1
							</a>
						</li>
						<li>
							<a className="reading__link" href="#">
								Knowledge base: article #2
							</a>
						</li>
						<li>
							<a className="reading__link" href="#">
								Knowledge base: article #3
							</a>
						</li>
					</ul>
				</div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus fermentum risus, sit amet fringilla nunc pellentesque quis.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus fermentum risus, sit amet fringilla nunc pellentesque quis.
				</p>
			</SimpleBar>
		</CardPanel>
	);
};

export { PreferencesPanel };
