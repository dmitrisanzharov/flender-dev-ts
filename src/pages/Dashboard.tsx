import React, { useEffect, useState } from "react";
import { sessionUser } from "../utils/namesOfGlobalVariables";
import { useNavigate } from "react-router-dom";

type Props = {};

const Dashboard = (props: Props) => {
	const userData = JSON.parse(sessionStorage.getItem(sessionUser) as string);
	console.log("userData: ", userData);

	const [redirectCauseNoSession, setRedirectCauseNoSession] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.getItem(sessionUser)) {
			return;
		}

		if (sessionStorage.getItem(sessionUser) === null) {
			setRedirectCauseNoSession(true);
		}
	}, []);

	useEffect(() => {
		if (redirectCauseNoSession === false) {
			return;
		}

		const timeOut = setTimeout(() => {
			navigate("/login");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [redirectCauseNoSession, navigate]);

	if (redirectCauseNoSession === true) {
		return (
			<div>
				<h1>You need to login first</h1>
				<h2>You are redirected to LOGIN PAGE</h2>
				<h2>======================</h2>
			</div>
		);
	}

	return (
		<div>
			<h1>Welcome Back to Flender!</h1>
			<h1>First name: {userData?.fName as string}</h1>
			<h1>Second name: {userData?.sName as string}</h1>
			<h4>
				Here is your unique reference when making credit transfers:{" "}
				<span style={{ color: "blue" }}>
					{(userData?.flenderId as string)?.toUpperCase()}
				</span>
			</h4>
			<hr />
			<h2>My Account</h2>
			<p>
				Total Deposits:{" "}
				{(userData?.totalDeposits as number)?.toLocaleString("en-GB", {
					style: "currency",
					currency: "EUR",
				})}
			</p>
			<p>
				Total Withdrawals:{" "}
				{(userData?.totalWithdrawals as number)?.toLocaleString("en-GB", {
					style: "currency",
					currency: "EUR",
				})}
			</p>

			<p>
				Available Balance:{" "}
				{(
					userData?.totalDeposits -
					userData?.totalWithdrawals -
					userData?.totalInvestments
				)?.toLocaleString("en-GB", {
					style: "currency",
					currency: "EUR",
				})}
			</p>
			<hr />
			<h2>My Investments</h2>
			<p>
				Total Investments:{" "}
				{(userData?.totalInvestments as number)?.toLocaleString("en-GB", {
					style: "currency",
					currency: "EUR",
				})}
			</p>

			<p>
				Number of investments:{" "}
				<span style={{ color: "red", fontWeight: "bold" }}>TO DO</span>
			</p>
		</div>
	);
};

export default Dashboard;
