// Modules
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import './Industry.css';
import './Industry.media.css';

// Assets
import arrowForwardImg from '../../../assets/arrow_forward.svg';

// Interfaces
import { RootState } from '../../../reducers';
import { IndustryType } from '../../../reducers/app';

// Store
import * as appTypes from '../../../reducers/app/types';
import * as appThunks from '../../../reducers/app/thunks';

// Components
import { CustomSwitch } from '../../common/CustomSwitch';
import { SearchInput } from './SearchInput';
import { List } from './List';

const Industry = (): JSX.Element => {
	const {
		isAgnostic,
		isSendingData,
		selectedIndustries,
		selectedExclusions,
		isLoadingIndustries
	} = useSelector((state: RootState) => state.app);

	const dispatch = useDispatch();
	const handleSwitchClick = () => dispatch(appTypes.toggleAgnostic());

	React.useEffect(() => {
		dispatch(appThunks.loadIndustries());
	}, []);
	let industriesClasses = 'industries__container flex-column';
	
	if (isAgnostic) {
		industriesClasses += ' industries__container--disabled';
	}
	const renderResetBtn = () => {
		if (selectedIndustries.length === 0 && selectedExclusions.length === 0) {
			return null;
		}
		let resetBtnText = 'Reset industries';

		if (selectedIndustries.length > 0 && selectedExclusions.length > 0) {
			resetBtnText = 'Reset all';
		}
		let resetClasses = 'reset flex-row';

		if (isAgnostic) {
			resetClasses += ' reset--disabled';
		}
		return (
			<div className={resetClasses}>
				<button
					className="reset__industries"
					disabled={isAgnostic}
					onClick={() => dispatch(appTypes.resetIndustries())}
					type="button"
				>
					{resetBtnText}
				</button>
			</div>
		);
	};
	let interestBlockClasses = 'interest__block flex-column';

	if (isAgnostic) {
		interestBlockClasses += ' interest__block--disabled';
	}
	return (
		<form
			className="industry__container flex-column"
			onSubmit={(e) => {
				e.preventDefault();
				dispatch(appThunks.sendDataToServer());
			}}
		>
			<p className="industry__text semi-bold">
				Determine your industry preferences
			</p>
			<div className="agnostic flex-column">
				<p className="font-12">
					Industry agnostic
				</p>
				<CustomSwitch
					checked={isAgnostic}
					onClick={handleSwitchClick}
				/>
			</div>
			<div className="industry__divider">
				<div className="industry__divider__text flex-row">
					<p className="font-12">
						Or
					</p>
				</div>
			</div>
			<div className={industriesClasses}>
				<div className="industries__wrapper">
					<div className="industries__block flex-column">
						<div className="industries__search__form">
							<div className="industries__search__container flex-column">
								<SearchInput
									type={IndustryType.industry}
									disabled={isAgnostic || isLoadingIndustries}
									label="Add industries"
									placeholder="Search industry"
									id="SearchIndustry"
								/>
							</div>
						</div>
						{selectedIndustries.length > 0 && (
							<div className="industries__list__container flex-row">
								{selectedIndustries.length > 2 && (
									<div className={interestBlockClasses}>
										<p className="interest__high">High</p>
										<p className="interest__Low">Low</p>
									</div>
								)}
								<List disabled={isAgnostic} items={selectedIndustries} />
							</div>
						)}
					</div>
					<div className="exclusions__block flex-column">
						<div className="exclusions__search__form">
							<div className="exclusions__search__container flex-column">
								<SearchInput
									type={IndustryType.exclusion}
									disabled={isAgnostic || isLoadingIndustries}
									label="Add exclusions if any"
									placeholder="Search industry"
									id="SearchExclusion"
								/>
							</div>
						</div>
					</div>
					{renderResetBtn()}
				</div>
			</div>
			<button
				className="continue-btn flex-row font-14"
				disabled={isSendingData}
				type="submit"
			>
				Continue
				<img src={arrowForwardImg} alt="Continue" />
			</button>
		</form>
	);
};

export { Industry };
