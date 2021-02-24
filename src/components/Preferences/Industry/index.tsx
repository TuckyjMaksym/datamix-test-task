// Modules
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import './Industry.css';

// Assets
import arrowForwardImg from '../../../assets/arrow_forward.svg';

// Interfaces
import { RootState } from '../../../reducers';

// Store
import * as appTypes from '../../../reducers/app/types';
import * as appThunks from '../../../reducers/app/thunks';

// Components
import { CustomSwitch } from '../../common/CustomSwitch';
import { SearchInput } from './SearchInput';
import { List } from './List';

const Industry = (): JSX.Element => {
	const {
		industries,
		isAgnostic,
		isLoadingIndustries
	} = useSelector((state: RootState) => state.app);

	const dispatch = useDispatch();
	const handleSwitchClick = () => dispatch(appTypes.toggleAgnostic());

	React.useEffect(() => {
		dispatch(appThunks.loadIndustries());
	}, []);

	return (
		<div className="industry__container flex-column">
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
			<div className="industries__container flex-column">
				<div className="industries__block flex-column">
					<form className="industries__search__form">
						<div className="industries__search__container flex-column">
							<SearchInput
								disabled={isLoadingIndustries}
								label="Add industries"
								placeholder="Search industry"
								id="SearchIndustry"
							/>
						</div>
					</form>
					{industries.length > 0 && (
						<div className="industries__list__container flex-row">
							{industries.length > 2 && (
								<div className="interest__block flex-column">
									<p className="interest__high">High</p>
									<p className="interest__Low">Low</p>
								</div>
							)}
							<List industries={[industries[0], industries[1]]} />
						</div>
					)}
				</div>
				<div className="exclusions__block flex-column">
					<form className="exclusions__search__form">
						<div className="exclusions__search__container flex-column">
							<SearchInput
								disabled={isLoadingIndustries}
								label="Add exclusions if any"
								placeholder="Search industry"
								id="SearchExclusion"
							/>
						</div>
					</form>
				</div>
				<div className="reset">
					<button className="reset__industries">
						Reset industries
					</button>
				</div>
			</div>
			<button className="continue flex-row font-14">
				Continue
				<img src={arrowForwardImg} alt="Continue" />
			</button>
		</div>
	);
};

export { Industry };
