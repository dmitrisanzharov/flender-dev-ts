import React, { useEffect, useState } from "react";
import { projectOfInterest } from "../utils/namesOfGlobalVariables";
import { useNavigate } from "react-router-dom";

type Props = {};

const Invest = (props: Props) => {
	const amountToInvest = new URLSearchParams(window.location.search).get(
		"amount"
	);
	console.log("amountToInvest: ", amountToInvest);

	const projectData = JSON.parse(
		sessionStorage?.getItem(projectOfInterest) as string
	);

	const [returnToMarketPlace, setReturnToMarketPlace] =
		useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!amountToInvest || !projectData) {
			setReturnToMarketPlace(true);
		}
	}, []);

	useEffect(() => {
		if (!returnToMarketPlace) {
			return;
		}

		const timeOut = setTimeout(() => {
			navigate("/marketplace");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [returnToMarketPlace]);

	if (returnToMarketPlace) {
		return (
			<div>
				<h1>You need to select project and amount to invest before</h1>
				<h2>You will be redirected to MARKETPLACE</h2>
				<h2>============================</h2>
			</div>
		);
	}

	if (!returnToMarketPlace) {
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
		} = projectData;

		return (
			<div>
				<h1>Let us calculate your investment and return</h1>
				<hr />
				<h4>Overall repayment details</h4>
				<ul>
					<li>
						Total investment amount: €
						{(amountToInvest as unknown as number).toLocaleString("en-GB", {
							style: "currency",
							currency: "EUR",
						})}
					</li>
					<li>
						You will be paid in: {projectDurationInMonthsJustTheNumber} months
					</li>
					<li>
						Monthly repayment to you {"(approx)"}:{" "}
						{(
							(amountToInvest as unknown as number) /
							projectDurationInMonthsJustTheNumber
						)?.toLocaleString("en-GB", {
							style: "currency",
							currency: "EUR",
						})}
					</li>
				</ul>
			</div>
		);
	}

	return null;
};

export default Invest;
