import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllProjects } from "../utils/serverRoutes";
import { Link } from "react-router-dom";

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
			<div className="MarketplaceContainer">
				<h1>Marketplace</h1>
				<div style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>
					<em>Successful Irish businesses growing with Flender finance</em>
				</div>
				{state?.data?.map((el) => {
					const {
						_id,
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
						<Link to={`/projects/${projectName}/${_id}`} key={projectName}>
							<div className="MarketplaceContainer_SingleProject">
								<div>Project name: {projectName}</div>
								<div>Company name: {nameOfCompany}</div>
								<div>Company address: {address}</div>
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
									Project duration: {projectDurationInMonthsJustTheNumber}{" "}
									months
								</div>
								<div>
									<p>
										<b>Why invest with us?</b>
									</p>
									<ul>
										{whyInvestInUs?.map((el) => {
											return <li key={el}>{el}</li>;
										})}
									</ul>
								</div>
								<div>
									<p>
										<b>How we will use your money?</b>
									</p>
									<ul>
										{howWillWeUseYourInvestment?.map((el) => {
											return <li key={el}>{el}</li>;
										})}
									</ul>
								</div>
								<div>
									<p>
										<b>Our Story</b>
									</p>
									<ul>
										{ourStory?.map((el) => {
											return <li key={el}>{el}</li>;
										})}
									</ul>
								</div>
								<iframe
									width="600"
									height="450"
									style={{ border: "none" }}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									src={`https://maps.google.com/maps?q=${
										latitudeLongitudeArray[0]
									},${latitudeLongitudeArray[1]}&z=${16}&output=embed`}
									title="google map"
								></iframe>
							</div>
						</Link>
					);
				})}
			</div>
		);
	}

	return null;
};

export default Marketplace;
