import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import DashboardNavBar from "./DashboardNavBar";

type Props = {};

const NavBarController = (props: Props) => {
	const location = useLocation();

	useMemo(() => {
		console.log("this is location: ", location.pathname);
		console.log("=======================");
	}, [location]);

	if (location.pathname === "/dashboard") {
		return <DashboardNavBar />;
	}

	return <NavBar location={location.pathname} />;
};

export default NavBarController;
