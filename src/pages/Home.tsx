import React from "react";
import { Helmet } from "react-helmet";

type Props = {};

const Home = (props: Props) => {
	return (
		<div>
			<Helmet>
				<title>Home page</title>
			</Helmet>
			<h1>Home</h1>
		</div>
	);
};

export default Home;
