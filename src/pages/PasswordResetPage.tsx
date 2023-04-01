import React, { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { passwordResetPage } from "../utils/serverRoutes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

type Props = {};

const PasswordResetPage = (props: Props) => {
	const clientEmail = new URLSearchParams(window.location.search).get("email");
	console.log("clientEmail: ", clientEmail);

	const [showError, setShowError] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const navigate = useNavigate();

	const validationSchema = z
		.object({
			password: string().min(3, {
				message: "needs to be at least 3 character long",
			}),
			confirm: string().min(3, {
				message: "needs to be at least 3 character long",
			}),
		})
		.refine((data) => data.password === data.confirm, {
			// this is kinda Reverse, so this is the PASS condition, if this is not true then throw an error
			message: "Passwords don't match",
			path: ["confirm"],
		});

	const { register, control, handleSubmit, formState } = useForm({
		resolver: zodResolver(validationSchema),
	});

	const { errors } = formState;

	const onSubmit = (data) => {
		console.log("submitted data", data);
		axios
			.get(
				passwordResetPage + `?email=${clientEmail}&password=${data.password}`
			)
			.then((el) => {
				if (el.data !== "password_updated") {
					setShowError(true);
					return;
				}
				if (el.data === "password_updated") {
					setRedirect(true);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (showError === false) {
			return;
		}
		const timeOut = setTimeout(() => {
			setShowError(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [showError]);

	useEffect(() => {
		if (redirect === false) {
			return;
		}
		const timeOut = setTimeout(() => {
			navigate("/login");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [redirect]);

	if (redirect) {
		return (
			<div>
				<h1>Password was reset Successfully</h1>
				<h2>You are now being redirected to LOGIN PAGE</h2>
				<h2>=================================</h2>
			</div>
		);
	}

	return (
		<div>
			<Helmet>
				<title>Password Reset Page</title>
			</Helmet>
			<h1>Password reset page</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p>Password</p>
					<input type="password" {...register("password")} />
					<div style={{ color: "red" }}>
						{errors?.password?.message as string}
					</div>
				</div>

				<div>
					<p>Confirm</p>
					<input type="password" {...register("confirm")} />
					<div style={{ color: "red" }}>
						{errors?.confirm?.message as string}
					</div>
				</div>
				<button type="submit">reset</button>
			</form>
			{showError && (
				<h1 style={{ color: "red" }}>
					There was an error, please try again in 2 minutes
				</h1>
			)}
		</div>
	);
};

export default PasswordResetPage;
