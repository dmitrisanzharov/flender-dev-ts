import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

type Props = {};

const Error = (props: Props) => {
	return (
		<div>
			<Helmet>
				<title>Error page</title>
			</Helmet>
			<h2>Error, 404 is not found</h2>
			<Link to="/">Back to home</Link>
		</div>
	);
};

export default Error;
