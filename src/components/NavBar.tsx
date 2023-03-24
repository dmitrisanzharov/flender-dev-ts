import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sessionUser } from "../utils/namesOfGlobalVariables";

type Props = {
	location: string;
};

const NavBar = ({ location }: Props) => {
	//! There is probably no need for Location props in here, but I have it just in case for future. Dmitri, 24-Mar-2023

	return (
		<nav>
			<Link to="/">Flender Logo</Link>
			<Link to="/marketplace">Marketplace</Link>

			{sessionStorage.getItem(sessionUser) ? (
				<button className="cursorPointer">
					<Link to="/dashboard">Dashboard</Link>
				</button>
			) : (
				<div className="LoginAndGetStartedBox">
					<button className="cursorPointer">
						<Link to="/login">Log in</Link>
					</button>
					<button className="cursorPointer">
						<Link to="/join">Register</Link>
					</button>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
