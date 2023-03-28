import React, { useEffect, useState } from "react";

type Props = {};

const Investments = (props: Props) => {
	const [loanName, setLoanName] = useState("");

	return (
		<div className="InvestmentsContainer">
			<h1>My Investments</h1>
			<div>
				<p>Loan Name / ID</p>
				<input
					type="text"
					value={loanName}
					onChange={(e) => setLoanName(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default Investments;
