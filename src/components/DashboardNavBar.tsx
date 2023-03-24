import React from "react";
import { Link } from "react-router-dom";
import { sessionUser } from "../utils/namesOfGlobalVariables";
import { useNavigate } from "react-router-dom";

type Props = {};

// TODO: Notifications

const DashboardNavBar = (props: Props) => {
	const userData = JSON.parse(sessionStorage.getItem(sessionUser) as string);

	const navigate = useNavigate();

	function handleLogout() {
		sessionStorage.removeItem(sessionUser);
		navigate("/");
	}

	return (
		<nav>
			<div className="DashboardNavBar_Container">
				<Link to="/">Flender Logo</Link>
				<Link to="/marketplace">Marketplace</Link>
				<div className="DashboardNavBar_Container_RightItemsBox">
					<div>
						Available Balance:{" "}
						{(
							userData?.totalDeposits -
							userData?.totalInvestments -
							userData?.totalWithdrawals
						).toLocaleString("en-GB", {
							style: "currency",
							currency: "EUR",
						})}
					</div>
					<button>
						Notifications:{" "}
						<span style={{ color: "red", fontWeight: "bold" }}>TO DO</span>
					</button>
					<button onClick={handleLogout}>Logout</button>
				</div>
			</div>
		</nav>
	);
};

export default DashboardNavBar;
