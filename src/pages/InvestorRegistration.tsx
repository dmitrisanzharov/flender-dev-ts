import React from "react";

type Props = {};

const InvestorRegistration = (props: Props) => {
	return (
		<div>
			<h3>Join today and start investing in minutes.</h3>
			<hr />
			<label htmlFor="fName">First Name</label>
			<input type="text" name="fName" placeholder="First Name" />
			<br /> <br />
			<label htmlFor="lastName">Last Name</label>
			<input type="text" name="lastName" placeholder="Last Name" />
			<br /> <br />
			<label htmlFor="lastName">Last Name</label>
			<input type="text" name="lastName" placeholder="Last Name" />
		</div>
	);
};

export default InvestorRegistration;
