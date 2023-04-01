import React, { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, number, z } from "zod";
import axios from "axios";
import { addFunds } from "../utils/serverRoutes";
import {
	sessionUser,
	projectOfInterest,
} from "../utils/namesOfGlobalVariables";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addNotification } from "../helper/helperFunctions";
import { Helmet } from "react-helmet";

type Props = {};

const AddFunds = (props: Props) => {
	const [redirect, setRedirect] = useState(false);
	const validationSchema = z.object({
		amount: string(),
	});

	const { register, control, handleSubmit, formState } = useForm({
		resolver: zodResolver(validationSchema),
	});
	// console.log("register: ", register("name"));

	// useController({ name: "country", control });
	const { errors } = formState;
	const navigate = useNavigate();

	const onSubmit = (data) => {
		console.log("submitted data", data);

		axios
			.get(
				addFunds +
					`?userId=${
						JSON.parse(sessionStorage.getItem(sessionUser) as string)?._id
					}&amountInEuro=${data.amount}`
			)
			.then((el) => {
				console.log(el.data);
				sessionStorage.setItem(sessionUser, JSON.stringify(el.data));
				addNotification("added funds", `you have added ${data.amount} euro`);
				setRedirect(true);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (redirect === false) {
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
				<h1>Money added successfully</h1>
				<h2>You are being redirected to DASHBOARD</h2>
				<h2>========================</h2>
			</div>
		);
	}
	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Add funds</title>
			</Helmet>
			<h1>Add Funds To Your Account</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p>please enter amount, min is 50, max is 5000 euro</p>
					<input type="number" min="50" max="5000" {...register("amount")} />
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

export default AddFunds;
