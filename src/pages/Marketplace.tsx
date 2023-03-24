import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllProjects } from "../utils/serverRoutes";

type Props = {};

interface ProjectInformation {
	_id: string;
	projectName: string;
	imageURL: string;
	projectNameToDisplayOnACard: string;
	nameOfCompany: string;
	interestRateToDisplayOnACard: number;
	projectGrade: string;
	totalAmountAsStringNoEuroSign: number;
	totalFunded: number;
	projectDurationInMonthsJustTheNumber: number;
	ribbonType: string;
	dateCreated: Date;
	address: string;
	whyInvestInUs: string[];
	howWillWeUseYourInvestment: string[];
	ourStory: string[];
	latitudeLongitudeArray: string[];
	__v: number;
}

interface State {
	loading: boolean;
	data: ProjectInformation[] | null;
	error: string | null;
}

const Marketplace = (props: Props) => {
	const [state, setState] = useState<State | null>({
		loading: true,
		data: null,
		error: null,
	});

	useEffect(() => {
		axios
			.get(getAllProjects)
			.then((el) => setState({ loading: false, data: el.data, error: null }))
			.catch((err) => setState({ loading: false, data: null, error: err }));
	}, []);

	if (state?.error) {
		return <h1>bit fat error</h1>;
	}

	if (state?.loading) {
		return <h1>Loading please wait</h1>;
	}

	if (state?.data) {
		return (
			<div>
				<h1>Marketplace</h1>
				{state?.data?.map((el) => {
					const {
						projectName,
						nameOfCompany,
						interestRateToDisplayOnACard,
						projectGrade,
						totalAmountAsStringNoEuroSign,
						totalFunded,
						projectDurationInMonthsJustTheNumber,
						address,
						whyInvestInUs,
						howWillWeUseYourInvestment,
						ourStory,
						latitudeLongitudeArray,
					} = el;
					return (
						<div
							key={projectName}
							className="MarketplaceContainer_SingleProject"
						>
							<div>Project name: {projectName}</div>
							<div>Company name: {nameOfCompany}</div>

							<div>Interest rate: {interestRateToDisplayOnACard}%</div>
							<div>Project Grade: {projectGrade}</div>
							<div>
								Amount requested:{" "}
								{totalAmountAsStringNoEuroSign.toLocaleString("en-GB", {
									style: "currency",
									currency: "EUR",
								})}
							</div>
							<div>
								Total funded:{" "}
								{totalFunded.toLocaleString("en-GB", {
									style: "currency",
									currency: "EUR",
								})}
							</div>
							<div>
								Project duration: {projectDurationInMonthsJustTheNumber} months
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	return null;
};

export default Marketplace;
