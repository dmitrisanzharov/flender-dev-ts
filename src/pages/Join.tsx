import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Join = (props: Props) => {
	return (
		<div>
			<h3>Earn great returns by lending to Irish businesses</h3>
			<p>
				Earn great returns by investing in Irish businesses and get started with
				as little as €50. There are no fees, you choose the businesses you lend
				to, and you can automatically invest using AutoFlend.
			</p>
			<button>
				<Link to="/users/registration/investor">Start investing</Link>
			</button>
			<hr />
			<h3>Business loans up to €300,000 with same day approval</h3>
			<p>
				Help to grow your business with fast affordable finance and same-day
				decisions. Loans from €10,000 to €300,000, competitive rates and terms
				of up to 60 months.
			</p>
			<button>Get a Flender loan</button>
		</div>
	);
};

export default Join;
