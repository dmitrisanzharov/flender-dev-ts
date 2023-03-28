import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	sessionUser,
	projectOfInterest,
} from "../utils/namesOfGlobalVariables";
import { useNavigate } from "react-router-dom";

type Props = {};

// TODO: Notifications

const DashboardNavBar = (props: Props) => {
	const [showNotifications, setShowNotifications] = useState(false);
	const userData = JSON.parse(sessionStorage.getItem(sessionUser) as string);
	const navigate = useNavigate();
	const [showAddFundsDropDown, setShowAddFundsDropDown] =
		useState<boolean>(false);

	function handleLogout() {
		sessionStorage.removeItem(sessionUser);
		sessionStorage.removeItem(projectOfInterest);
		sessionStorage.removeItem("fNotifications");
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
					<div className="DashboardNavBar_Container_RightItemsBox_NotificationsBox">
						<button onClick={() => setShowNotifications(!showNotifications)}>
							<span>{showNotifications ? "-" : "+"}</span> | Notifications
						</button>
						{showNotifications && sessionStorage.getItem("fNotifications") && (
							<div className="DashboardNavBar_Container_RightItemsBox_NotificationsBox_DropDown">
								{JSON.parse(sessionStorage.getItem("fNotifications") as string)
									?.reverse()
									.map((el) => {
										return (
											<div key={el.date}>
												<div>{JSON.stringify(el)}</div>
												<hr />
											</div>
										);
									})}
							</div>
						)}
					</div>
					<div>
						<button onClick={handleLogout}>Logout</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default DashboardNavBar;
