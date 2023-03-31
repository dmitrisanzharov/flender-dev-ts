import React, { useEffect, useState, useMemo, useRef } from "react";
import moment from "moment";
import { jsPDF } from "jspdf";

type Props = {};

const Investments = (props: Props) => {
	const [loanName, setLoanName] = useState("");
	const [selectTerm, setSelectTerm] = useState("all");

	const pdfDownload = useRef<HTMLInputElement>(null);

	function filterLoanProjects() {
		let test = JSON.parse(
			sessionStorage.getItem("flenderSessionUser") as string
		)
			?.transactions.filter((el) => {
				return el.projectName && el.projectGrade && el.loanDurationInMonths;
			})
			.reverse();

		if (loanName !== "") {
			// console.log("loanName");
			test = test?.filter((el) => {
				const testStr = new RegExp(`${loanName}`, "gi");
				return testStr.test(el.projectName);
			});
		}

		if (selectTerm !== "all") {
			// console.log("selectTerm");
			if (selectTerm === "6-12") {
				test = test?.filter((el) => {
					return (
						/([6-9]|1[0-2])/gi.test(String(el.loanDurationInMonths)) &&
						el.loanDurationInMonths < 13
					);
				});
			}

			if (selectTerm === "13-24") {
				test = test?.filter((el) => {
					return (
						/(1[3-9]|2[0-4])/gi.test(String(el.loanDurationInMonths)) &&
						el.loanDurationInMonths > 12 &&
						el.loanDurationInMonths < 25
					);
				});
			}

			if (selectTerm === "25-36") {
				test = test?.filter((el) => {
					return (
						/(2[5-9]|3[0-6])/gi.test(String(el.loanDurationInMonths)) &&
						el.loanDurationInMonths > 24 &&
						el.loanDurationInMonths < 37
					);
				});
			}

			if (selectTerm === "37+") {
				test = test?.filter((el) => {
					return el.loanDurationInMonths > 36;
				});
			}
		}

		// if (loanName !== "" && selectTerm !== "all") {
		// 	console.log("both filters");
		// 	return;
		// }

		return test;
	}

	function downloadAsPdf() {
		console.log("downloadAsPdf");

		(window as any).html2pdf(pdfDownload.current).save();
	}

	useEffect(() => {
		console.log("loanName", loanName);
		console.log("selectTerm", selectTerm);
	}, [loanName, selectTerm]);

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
			<div>
				<p>Terms</p>
				<select
					value={selectTerm}
					onChange={(e) => setSelectTerm(e.target.value)}
				>
					<option value="all">all</option>
					<option value="6-12">6 to 12</option>
					<option value="13-24">13 to 24</option>
					<option value="25-36">25 to 36</option>
					<option value="37+">37 or more</option>
				</select>
			</div>
			<div>
				<p>Download options</p>
				<button onClick={downloadAsPdf}>download as PDF</button>
			</div>
			<hr />
			<div ref={pdfDownload}>
				<table>
					<thead>
						<tr>
							<th>Transaction date</th>
							<th>Loan Id</th>
							<th>Project Name</th>
							<th>Project Grade</th>
							<th>Loan duration in months</th>
							<th>Amount in euro</th>
							<th>Loan Interest Rate</th>
							<th>Monthly repayments</th>
							<th>Total Interest earned on this loan</th>
						</tr>
					</thead>
					<tbody>
						{filterLoanProjects()?.map((el) => {
							const {
								amountInEuro,
								loanId,
								loanInterestRate,
								monthlyRepayment,
								projectName,
								totalInterestOnThisInvestment,
								transactionDate,
								projectGrade,
								loanDurationInMonths,
							} = el;
							return (
								<tr
									key={
										transactionDate +
										loanId +
										amountInEuro +
										projectName +
										monthlyRepayment
									}
								>
									<td>
										{moment(transactionDate).format("MMMM Do YYYY, h:mm:ss a")}
									</td>
									<td>{loanId}</td>
									<td>{projectName}</td>
									<td>{projectGrade}</td>
									<td>{loanDurationInMonths}</td>
									<td>
										{amountInEuro.toLocaleString("en-GB", {
											style: "currency",
											currency: "EUR",
										})}
									</td>
									<td>{loanInterestRate}%</td>
									<td>
										{monthlyRepayment.toLocaleString("en-GB", {
											style: "currency",
											currency: "EUR",
										})}
									</td>
									<td>
										{totalInterestOnThisInvestment.toLocaleString("en-GB", {
											style: "currency",
											currency: "EUR",
										})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{/* FINAL DIV END OF THE COMPONENT */}
		</div>
	);
};

export default Investments;
