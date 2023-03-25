import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import DashboardNavBar from "./DashboardNavBar";
import { sessionUser } from "../utils/namesOfGlobalVariables";

type Props = {};

const NavBarController = (props: Props) => {
	const location = useLocation();

	useMemo(() => {
		console.log("this is location: ", location.pathname);
		console.log("=======================");
	}, [location]);

	if (
		sessionStorage.getItem(sessionUser) &&
		location.pathname === "/dashboard"
	) {
		return <DashboardNavBar />;
	}

	return <NavBar location={location.pathname} />;
};

export default NavBarController;
