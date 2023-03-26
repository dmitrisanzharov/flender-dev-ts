import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import axios from "axios";
import { login } from "../utils/serverRoutes";
import { sessionUser } from "../utils/namesOfGlobalVariables";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
	const [showPass, setShowPass] = useState(false);
	const [userNotFound, setUserNotFound] = useState(false);
	const [passIncorrect, setPassIncorrect] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const navigate = useNavigate();

	const validationSchema = z.object({
		email: string().email(),
		password: string()
			.min(1, { message: "Please enter password" })
			.min(3, { message: "must be at least 3 characters long" }),
	});

	const { register, control, handleSubmit, formState } = useForm({
		resolver: zodResolver(validationSchema),
	});

	const { errors } = formState;

	const onSubmit = async (data) => {
		console.log("submitted data", data);

		// check if user is found
		const res = await axios.get(
			`${login}?email=${data.email}&password=${data.password}`
		);
		console.log(res.data);

		// if user does NOT exists
		if (res.data === "no_user_found") {
			setUserNotFound(true);
			return;
		}

		// if user exists but password is incorrect
		if (res.data === "password_is_incorrect") {
			setPassIncorrect(true);
			return;
		}

		// todo if all is good, so send instruction to redirect and save user as a Session
		console.log("user received, added to session storage");
		sessionStorage.setItem(sessionUser, JSON.stringify(res.data));
		setRedirect(true);
	};

	useEffect(() => {
		if (userNotFound === false) {
			return;
		}

		const timeOut = setTimeout(() => {
			setUserNotFound(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [userNotFound]);

	useEffect(() => {
		if (passIncorrect === false) {
			return;
		}

		const timeOut = setTimeout(() => {
			setPassIncorrect(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [passIncorrect]);

	useEffect(() => {
		if (redirect === false) {
			return;
		}

		const timeOut = setTimeout(() => {
			navigate("/dashboard");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [redirect]);

	if (redirect === true) {
		return (
			<div>
				<h1>You have logged in successfully</h1>
				<h2>You are being redirected to DASHBOARD page</h2>
				<h3>==========================</h3>
			</div>
		);
	}

	return (
		<div>
			<h1>Flenders Logo</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p>Email</p>
					<input type="text" {...register("email")} />
					<div style={{ color: "red" }}>{errors?.email?.message as string}</div>
					{userNotFound && (
						<div style={{ color: "red" }}>User not found please try again</div>
					)}
				</div>
				<div>
					<p>Password</p>
					<input
						type={showPass ? "text" : "password"}
						{...register("password")}
					/>
					<button type="button" onClick={() => setShowPass(!showPass)}>
						{showPass ? "hide" : "show"}
					</button>
					<div style={{ color: "red" }}>
						{errors?.password?.message as string}
					</div>
					{passIncorrect && (
						<div style={{ color: "red" }}>
							Password incorrect please try again
						</div>
					)}
				</div>
				<br />
				<button type="submit">submit</button>
			</form>
			<hr />
			<div>
				<h4>Password reset</h4>

				<Link to="/password-reset-email-page">click to reset password</Link>
			</div>
			<hr />
			<Link to="/users/registration/investor">
				If you are NOT REGISTERED, then go to Registration page
			</Link>
		</div>
	);
};

export default Login;
