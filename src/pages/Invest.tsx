import React, { useEffect, useState } from "react";
import {
	projectOfInterest,
	sessionUser,
} from "../utils/namesOfGlobalVariables";
import { investFlendersTs, investFINLENDERS } from "../utils/serverRoutes";
import { useNavigate } from "react-router-dom";
import {
	calculateMonthlyRepaymentsRoughly,
	calculateTotalInterest,
} from "../helper/helperFunctions";
import { addNotification } from "../helper/helperFunctions";
import axios from "axios";

type Props = {};

const Invest = (props: Props) => {
	const [redirect, setRedirect] = useState(false);
	const amountToInvest = new URLSearchParams(window.location.search).get(
		"amount"
	);
	console.log("amountToInvest: ", amountToInvest);

	const projectData = JSON.parse(
		sessionStorage?.getItem(projectOfInterest) as string
	);

	const [returnToMarketPlace, setReturnToMarketPlace] = useState(false);
	const navigate = useNavigate();

	function handleInvest() {
		console.log("handleInvest Triggered");
		axios
			.post(investFlendersTs, {
				userId: JSON.parse(sessionStorage.getItem(sessionUser) as string)?._id,
				amount: amountToInvest,
				projectId: projectData?._id,
				loanDurationInMonths: projectData?.projectDurationInMonthsJustTheNumber,
				loanInterestRate: projectData?.interestRateToDisplayOnACard,
				monthlyRepayment: // TODO   STOPPED HERE
			})
			.then((el) => {
				console.log(el.data);
				sessionStorage.setItem(sessionUser, JSON.stringify(el.data));
				console.log("user side is done, do project side now");
			})
			.catch((err) => console.log(err));

		// * NESTING ANOTHER AXIOS HERE, UNFORTUNATELY THIS IS THE WAY TO DO IT  =/

		axios
			.post(investFINLENDERS, {
				amount: amountToInvest,
				projectId: projectData?._id,
			})
			.then((el) => {
				console.log(el.data);
				sessionStorage.setItem(projectOfInterest, JSON.stringify(el.data));
				console.log("finlenders investment successful, redirect now");
				addNotification(
					"invested funds",
					`you have invested ${amountToInvest} euro`
				);
				setRedirect(true);
			})
			.catch((err) => console.log(err));
	}

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

	useEffect(() => {
		if (redirect === false) {
			return;
		}
		const timeOut = setTimeout(() => {
			navigate("/dashboard");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [redirect]);

	if (redirect) {
		return (
			<div>
				<h1>Investment was a success</h1>
				<h2>You are being redirected to the DASHBOARD</h2>
				<h2>============================</h2>
			</div>
		);
	}

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
						{calculateMonthlyRepaymentsRoughly(
							amountToInvest,
							interestRateToDisplayOnACard,
							projectDurationInMonthsJustTheNumber
						)}
					</li>
					<li>Interest rate on the loan: {interestRateToDisplayOnACard}%</li>
					<li>
						Interest you will earn on this loan:{" "}
						{calculateTotalInterest(
							amountToInvest,
							interestRateToDisplayOnACard,
							projectDurationInMonthsJustTheNumber
						)}
					</li>
				</ul>
				<hr />
				<h3>Confirm and pay</h3>
				<h2>Amount: € {Number(amountToInvest)?.toFixed(2)}</h2>
				<button
					onClick={() => {
						navigate(-1);
					}}
				>
					Back
				</button>
				<button onClick={handleInvest}>Make Payment</button>
			</div>
		);
	}

	return null;
};

export default Invest;
