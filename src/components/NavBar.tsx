import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const NavBar = (props: Props) => {
	return (
		<nav>
			<Link to="/">Flender Logo</Link>
			<div className="LoginAndGetStartedBox">
				<button className="cursorPointer">
					<Link to="/login">Log in</Link>
				</button>
				<button className="cursorPointer">
					<Link to="/join">Register</Link>
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
