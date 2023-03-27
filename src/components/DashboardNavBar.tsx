import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sessionUser } from "../utils/namesOfGlobalVariables";
import { useNavigate } from "react-router-dom";

type Props = {};

// TODO: Notifications

const DashboardNavBar = (props: Props) => {
	const userData = JSON.parse(sessionStorage.getItem(sessionUser) as string);
	const navigate = useNavigate();
	const [showAddFundsDropDown, setShowAddFundsDropDown] =
		useState<boolean>(false);

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
					<div className="DashboardNavBar_Container_RightItemsBox_ShowAddFundsContainer">
						<button
							onClick={() => setShowAddFundsDropDown(!showAddFundsDropDown)}
						>
							<span>{showAddFundsDropDown ? "-" : "+"} | </span>Available
							Balance:{" "}
							{(
								userData?.totalDeposits -
								userData?.totalInvestments -
								userData?.totalWithdrawals
							).toLocaleString("en-GB", {
								style: "currency",
								currency: "EUR",
							})}
						</button>
						{showAddFundsDropDown && (
							<div className="DashboardNavBar_Container_RightItemsBox_ShowAddFundsContainer_AddFundsDropdown">
								<button>
									<Link to="/add-funds">Add Funds</Link>
								</button>
								<button>
									<Link to="/withdraw">Withdraw funds</Link>
								</button>
							</div>
						)}
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
