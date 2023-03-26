import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getSingleProject } from "../utils/serverRoutes";
import {
	sessionUser,
	projectOfInterest,
} from "../utils/namesOfGlobalVariables";
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
	data: ProjectInformation | null;
	error: string | null;
}

// todo check if project is found

// todo project is NOT found in the

// todo project is FOUND

const Projects = (props: Props) => {
	const { projectName, projectId } = useParams();

	const [state, setState] = useState<State | null>({
		loading: true,
		data: null,
		error: null,
	});
	const [investAmount, setInvestAmount] = useState<number>(50);

	useEffect(() => {
		axios
			.get(getSingleProject + `?projectName=${projectName}`)
			.then((res) => {
				setState({ loading: false, data: res.data, error: null });
				setInvestAmount(
					(
						(res.data?.totalAmountAsStringNoEuroSign - res.data?.totalFunded) /
						2
					).toFixed(2) as unknown as number
				);
				sessionStorage.setItem(projectOfInterest, JSON.stringify(res.data));
			})
			.catch((err) =>
				setState({ loading: false, data: null, error: err.message })
			);
	}, []);

	if (state?.loading) {
		return <h1>Loading please wait</h1>;
	}

	if (state?.error) {
		return <h1>There was an error, here is the message: {state?.error}</h1>;
	}

	if (state?.data) {
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
			dateCreated,
		} = state?.data;

		// console.log((totalFunded / totalAmountAsStringNoEuroSign) * 100);

		return (
			<div>
				<h1>{projectName}</h1>
				<h2>by {nameOfCompany}</h2>
				<p>
					Required over: {projectDurationInMonthsJustTheNumber} months, amount
					of:{" "}
					{totalAmountAsStringNoEuroSign?.toLocaleString("en-GB", {
						style: "currency",
						currency: "EUR",
					})}
				</p>

				<div className="ProjectsContainer_ProjectSliderBackground">
					<div
						className="ProjectsContainer_ProjectSliderBackground_ProgressBar"
						style={{
							width: `${(totalFunded / totalAmountAsStringNoEuroSign) * 100}%`,
						}}
					></div>
					<div
						className="ProjectsContainer_ProjectSliderBackground_ProgressAmount"
						style={{
							left: `${(totalFunded / totalAmountAsStringNoEuroSign) * 100}%`,
						}}
					>
						<div className="ProjectsContainer_ProjectSliderBackground_ProgressAmount_Figure">
							<b>
								{" "}
								{totalFunded?.toLocaleString("en-GB", {
									style: "currency",
									currency: "EUR",
								})}{" "}
							</b>
						</div>
					</div>
				</div>
				{sessionStorage.getItem(sessionUser) && (
					<div>
						<hr />
						<h2>Choose Amount to Lend: </h2>
						<div className="ProjectsContainer_AmountToInvestInputContainer">
							<button
								onClick={() => setInvestAmount(Number(investAmount) - 10)}
								disabled={investAmount <= 50}
							>
								-
							</button>
							<input
								type="number"
								value={investAmount}
								min="50"
								max={totalAmountAsStringNoEuroSign - totalFunded}
								onChange={(e) =>
									setInvestAmount(e.target.value as unknown as number)
								}
							/>
							<button
								onClick={() => setInvestAmount(Number(investAmount) + 10)}
								disabled={
									investAmount >= totalAmountAsStringNoEuroSign - totalFunded
								}
							>
								+
							</button>
						</div>
						<div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
							<span>50</span>
							<input
								type="range"
								min="50"
								max={totalAmountAsStringNoEuroSign - totalFunded}
								value={investAmount}
								onChange={(e) =>
									setInvestAmount(e.target.value as unknown as number)
								}
							/>
							<span>
								{(totalAmountAsStringNoEuroSign - totalFunded).toFixed(0)}
							</span>
						</div>
						<div>
							<p>
								Over required term of {projectDurationInMonthsJustTheNumber}{" "}
								months
							</p>
							<p>Interest rate is: {interestRateToDisplayOnACard} %</p>
							<p>Project grade is: {projectGrade}</p>
							<h4>
								Your potential returns are:{" "}
								{(
									(investAmount * interestRateToDisplayOnACard) /
									100
								).toLocaleString("en-GB", {
									style: "currency",
									currency: "EUR",
								})}
							</h4>
						</div>
						<button>
							<Link to={`/invest?amount=${investAmount}`}>Start Investing</Link>
						</button>
					</div>
				)}
				<hr />
				<div>
					<p>
						<b>Campaign information</b>
					</p>
					<ul>
						<li>Created: {moment(dateCreated)?.format("dddd, MMM DD YYYY")}</li>
						<li>
							Raised:{" "}
							{totalFunded?.toLocaleString("en-GB", {
								style: "currency",
								currency: "EUR",
							})}{" "}
							of{" "}
							{totalAmountAsStringNoEuroSign?.toLocaleString("en-GB", {
								style: "currency",
								currency: "EUR",
							})}
						</li>
						<li>Loan term: {projectDurationInMonthsJustTheNumber} months</li>
						<li>Address: {address}</li>
						<li>Country: Ireland</li>
					</ul>
				</div>
				<hr />
				<p>
					<b>Why invest in us?</b>
				</p>
				<ul>
					{whyInvestInUs?.map((el) => {
						return (
							<li key={el} style={{ marginBottom: "1rem" }}>
								{el}
							</li>
						);
					})}
				</ul>
				<hr />
				<p>
					<b>How will we use your investment?</b>
				</p>
				<ul>
					{howWillWeUseYourInvestment?.map((el) => {
						return (
							<li key={el} style={{ marginBottom: "1rem" }}>
								{el}
							</li>
						);
					})}
				</ul>
				<hr />
				<p>
					<b>Where we are based</b>
				</p>
				<iframe
					width="600"
					height="450"
					style={{ border: "none" }}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					src={`https://maps.google.com/maps?q=${latitudeLongitudeArray[0]},${
						latitudeLongitudeArray[1]
					}&z=${16}&output=embed`}
					title="google map"
				></iframe>
				<hr />
				<p>
					<b>Our Story</b>
				</p>
				<ul>
					{ourStory?.map((el) => {
						return (
							<li key={el} style={{ marginTop: "1rem" }}>
								{el}
							</li>
						);
					})}
				</ul>

				{/* FINAL DIV, END OF THE COMPONENT */}
			</div>
		);
	}

	return null;

	return <div>Projects</div>;
};

export default Projects;
