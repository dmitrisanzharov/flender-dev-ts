import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sessionUser } from "../utils/namesOfGlobalVariables";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { withdrawFunds } from "../utils/serverRoutes";
import axios from "axios";

type Props = {};

const Withdraw = (props: Props) => {
	const navigate = useNavigate();
	const [redirect, setRedirect] = useState(false);

	const validationSchema = z.object({
		amount: string(),
	});

	const { register, control, handleSubmit, formState } = useForm({
		resolver: zodResolver(validationSchema),
	});
	const { errors } = formState;

	const onSubmit = (data) => {
		console.log("submitted data", data);
		axios
			.get(
				withdrawFunds +
					`?amount=${data.amount}&userId=${
						JSON.parse(sessionStorage.getItem(sessionUser) as string)?._id
					}`
			)
			.then((el) => {
				console.log("data", el.data);
				sessionStorage.setItem(sessionUser, JSON.stringify(el.data));
				setRedirect(true);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (!redirect) {
			return;
		}
		const timeOut = setTimeout(() => {
			navigate("/dashboard");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [redirect]);

	if (redirect) {
		return (
			<div>
				<h1>Money has been withdrawn</h1>
				<h2>You are now being redirected to DASHBOARD page</h2>
				<h2>========================</h2>
			</div>
		);
	}

	return (
		<div>
			<h1>Withdraw your available balance</h1>
			<h2>How much would you like to withdraw?</h2>
			<p>
				{" "}
				Enter an amount below and click 'Withdraw now' to send the money to your
				bank account now.
			</p>

			<hr />
			<h3>
				Available balance:{" "}
				{(
					JSON.parse(sessionStorage.getItem(sessionUser) as string)
						?.totalDeposits -
					JSON.parse(sessionStorage.getItem(sessionUser) as string)
						?.totalInvestments -
					JSON.parse(sessionStorage.getItem(sessionUser) as string)
						?.totalWithdrawals
				)?.toLocaleString("en-GB", {
					style: "currency",
					currency: "EUR",
				})}
			</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p>Withdraw amount</p>
					<input
						type="number"
						{...register("amount")}
						min="10"
						max={
							JSON.parse(sessionStorage.getItem(sessionUser) as string)
								?.totalDeposits -
							JSON.parse(sessionStorage.getItem(sessionUser) as string)
								?.totalInvestments -
							JSON.parse(sessionStorage.getItem(sessionUser) as string)
								?.totalWithdrawals
						}
					/>
					<div style={{ color: "red" }}>
						{errors?.amount?.message as string}
					</div>
				</div>
				<br />
				<button type="submit">submit</button>
			</form>
			<br />
			<button>
				<Link to="/dashboard">Dashboard</Link>
			</button>
		</div>
	);
};

export default Withdraw;
