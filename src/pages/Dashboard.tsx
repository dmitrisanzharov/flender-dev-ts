import React, { useEffect, useState, useMemo } from "react";
import { sessionUser } from "../utils/namesOfGlobalVariables";
import { useNavigate, Link } from "react-router-dom";
import {
	notifyUser,
	setAllNotificationsToTrue,
} from "../helper/helperFunctions";

type Props = {};

const Dashboard = (props: Props) => {
	const [showUserNotification, setShowUserNotification] = useState(false);
	// * CHECK IF LOGGED IN CODE
	const userData = JSON.parse(sessionStorage.getItem(sessionUser) as string);
	console.log("userData: ", userData);

	const [redirectCauseNoSession, setRedirectCauseNoSession] = useState(false);
	const navigate = useNavigate();

	const getAllInvestments = useMemo(() => {
		const getIt = userData?.transactions.filter((el) => {
			return el.transactionType === "investment";
		});
		console.log("getIt", getIt);
		return getIt?.length;
	}, [userData]);

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

	useEffect(() => {
		console.log("dashboard component re-rendered");
		console.log("notify user", notifyUser());

		if (notifyUser()?.length === 0) {
			console.log("no notifications available");
			setShowUserNotification(false);
			return;
		}

		setShowUserNotification(true);
	}, []);

	useEffect(() => {
		if (showUserNotification === false) {
			return;
		}

		setTimeout(() => {
			setAllNotificationsToTrue();
			setShowUserNotification(false);
		}, 2000);
	}, [showUserNotification]);

	if (redirectCauseNoSession === true) {
		return (
			<div>
				<h1>You need to login first</h1>
				<h2>You are redirected to LOGIN PAGE</h2>
				<h2>======================</h2>
			</div>
		);
	}

	// * END OF CHECKED IF LOGGED IN CODE

	return (
		<div className="DashboardContainer">
			{showUserNotification && (
				<div className="DashboardContainer_NotificationsBox drr">
					{notifyUser()?.map((el) => {
						const { type, text, date } = el;
						return (
							<ul key={date}>
								<li>{type}</li>
								<li>{text}</li>
								<li>{date}</li>
							</ul>
						);
					})}
				</div>
			)}
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
			<br />
			<div>
				{" "}
				<button>
					<Link to="/add-funds">Add Funds</Link>
				</button>{" "}
				<button>
					<Link to="/withdraw">Withdraw</Link>
				</button>
			</div>
			<br />

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
				Number of investments: <span>{getAllInvestments}</span>
			</p>

			<button>
				<Link to="/investments">My Investments</Link>
			</button>
		</div>
	);
};

export default Dashboard;
