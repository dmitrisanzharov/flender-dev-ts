import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import html2pdf from "html2pdf.js";
import { Helmet } from "react-helmet";

type Props = {};

const Transactions = (props: Props) => {
	const [lodgementOn, setLodgementOn] = useState("lodgement");
	const [withdrawalOn, setWithdrawalOn] = useState("withdrawal");
	const [investmentOn, setInvestmentOn] = useState("investment");
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [from, setFrom] = useState(
		moment().subtract(7, "days").format().split("T")[0]
	);
	const [to, setTo] = useState(moment().add(1, "days").format().split("T")[0]);
	const [calendarWarning, setCalendarWarning] = useState(false);
	const reportTemplatePdf = useRef<HTMLInputElement>(null);

	function userDataAndFilter() {
		setLoading(true);
		let transactionsData = JSON.parse(
			sessionStorage.getItem("flenderSessionUser") as string
		)
			?.transactions.reverse()
			.filter((el) => {
				const { transactionDate } = el;

				// console.log("from", new Date(from).getTime());
				// console.log("actual", new Date(transactionDate).getTime());
				// console.log("to", new Date(to).getTime());
				// console.log("=====================");

				return (
					new Date(transactionDate).getTime() >= new Date(from).getTime() &&
					new Date(transactionDate).getTime() < new Date(to).getTime()
				);
			});
		console.log("transactionsData: ", transactionsData);
		setLoading(false);
		setData(transactionsData);
	}

	function filterData() {
		setLoading(true);

		const newData = JSON.parse(
			sessionStorage.getItem("flenderSessionUser") as string
		)
			?.transactions.reverse()
			.filter((el) => {
				const { transactionType, transactionDate } = el;
				console.log("from", new Date(from).getTime());
				console.log("actual", new Date(transactionDate).getTime());
				console.log("to", new Date(to).getTime());
				console.log("=====================");
				return (
					(transactionType === lodgementOn ||
						transactionType === withdrawalOn ||
						transactionType === investmentOn) &&
					new Date(transactionDate).getTime() >= new Date(from).getTime() &&
					new Date(transactionDate).getTime() < new Date(to).getTime()
				);
			});

		setData(newData);
		setLoading(false);
	}

	function handlePdfDownload() {
		// console.log(reportTemplatePdf.current);
		(window as any).html2pdf(reportTemplatePdf.current).save();
	}

	function handleCSVDownload() {
		const headers = [
			"Transaction Type",
			"Transaction Amount",
			"All Other",
		].toString();
		console.log("headers: ", headers);

		const values = data.map((el) => {
			return Object.values(el).toString();
		});
		console.log("values: ", values);

		const csvFormat = [headers, ...values].join("\n");
		console.log("csvFormat: ", csvFormat);

		csvClientDownload(csvFormat);
	}

	function csvClientDownload(input) {
		const blob = new Blob([input], { type: "application/csv" });

		const url = URL.createObjectURL(blob);
		console.log("url: ", url);

		const a = document.createElement("a");
		a.download = "yourTransactionsInCSVFormat.csv";
		a.href = url;
		a.style.display = "none";

		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	}

	useEffect(() => {
		userDataAndFilter();
	}, []);

	useEffect(() => {
		// console.log("from", from);
		// console.log("to", to);
		filterData();
	}, [lodgementOn, withdrawalOn, investmentOn, from, to]);

	if (loading) {
		return (
			<div>
				<h1>Loading please wait</h1>
			</div>
		);
	}

	return (
		<div>
			<Helmet>
				<title>Transactions page</title>
			</Helmet>
			<button onClick={handlePdfDownload} type="button">
				download PDF
			</button>
			<span style={{ width: "1rem", display: "inline-block" }}></span>
			<button onClick={handleCSVDownload}>download CSV</button>
			<hr />
			<div
				ref={reportTemplatePdf}
				style={{ width: "70vw", paddingLeft: "1rem" }}
			>
				<h1>Transactions</h1>
				<div>
					<button
						onClick={() => {
							lodgementOn === ""
								? setLodgementOn("lodgement")
								: setLodgementOn("");
						}}
						style={
							lodgementOn !== ""
								? { backgroundColor: "lightblue" }
								: (null as any)
						}
					>
						lodgement
					</button>
					<button
						onClick={() => {
							withdrawalOn === ""
								? setWithdrawalOn("withdrawal")
								: setWithdrawalOn("");
						}}
						style={
							withdrawalOn !== ""
								? { backgroundColor: "lightblue" }
								: (null as any)
						}
					>
						withdrawal
					</button>
					<button
						onClick={() => {
							investmentOn === ""
								? setInvestmentOn("investment")
								: setInvestmentOn("");
						}}
						style={
							investmentOn !== ""
								? { backgroundColor: "lightblue" }
								: (null as any)
						}
					>
						investment
					</button>
					<br />
					<div className="TranscationsContainer_CalendarContainer">
						<div>
							<p>From</p>
							<input
								type="date"
								value={from}
								onChange={(e) => setFrom(e.target.value)}
							/>
						</div>
						<div>
							<p>To</p>
							<input
								type="date"
								value={to}
								onChange={(e) => setTo(e.target.value)}
							/>
						</div>
						{calendarWarning && (
							<div style={{ color: "red" }}>
								Date 'From' must be BEFORE 'to', likewise 'TO' must be AFTER
								'FROM' date
							</div>
						)}
					</div>
				</div>

				<hr />
				{data?.map((el) => {
					const { loanId, transactionDate, transactionType } = el;

					return (
						<div key={loanId + transactionDate}>
							<p>
								<b>Transaction type:</b> {transactionType}
							</p>
							<p>
								<b>Transaction date:</b>{" "}
								{moment(transactionDate).format("MMMM Do YYYY, h:mm:ss a")}
							</p>
							<div className="TranscationsContainer_CalendarContainer_ProjectContent">
								{JSON.stringify(el)}
							</div>
							<hr />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Transactions;
