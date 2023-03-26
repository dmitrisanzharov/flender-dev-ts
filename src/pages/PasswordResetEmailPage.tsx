import React, { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import axios from "axios";
import { passwordResetEmailPage } from "../utils/serverRoutes";
import { useNavigate } from "react-router-dom";

type Props = {};

const PasswordResetEmailPage = (props: Props) => {
	const [emailNotFound, setEmailNotFound] = useState<boolean>(false);
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();

	const validationSchema = z.object({
		email: string()
			.email()
			.min(1, { message: "please enter email" })
			.min(3, { message: "email must be at least 3 characters long" }),
	});

	const { register, control, handleSubmit, formState } = useForm({
		resolver: zodResolver(validationSchema),
	});
	// console.log("register: ", register("name"));

	// useController({ name: "country", control });
	const { errors } = formState;

	const onSubmit = (data) => {
		axios
			.get(passwordResetEmailPage + `?email=${data.email}`)
			.then((el) => {
				console.log(el.data);
				if (el.data === "email_does_not_exist") {
					console.log("test");
					setEmailNotFound(true);
					return;
				}

				if (el.data === "email_is_found") {
					console.log("email is found redirect");
					setRedirect(true);
					return;
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (emailNotFound === false) {
			return;
		}

		const timeOut = setTimeout(() => {
			setEmailNotFound(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [emailNotFound]);

	useEffect(() => {
		if (redirect === false) {
			return;
		}
		const timeOut = setTimeout(() => {
			navigate("/login");
		}, 3000);
		return () => clearTimeout(timeOut);
	}, [redirect]);

	if (redirect) {
		return (
			<div>
				<h1>We sent you an EMAIL with reset password</h1>
				<h1>You are now being redirected to LOGIN PAGE</h1>
				<h1>==========================</h1>
			</div>
		);
	}

	return (
		<div>
			<h1>
				Please enter your email - and we will email you password reset link
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p>Email</p>
					<input type="text" {...register("email")} />
					<div style={{ color: "red" }}>{errors?.email?.message as string}</div>
					{emailNotFound && (
						<div style={{ color: "red" }}>
							email is not found please try again
						</div>
					)}
				</div>
				<hr />
				<button type="submit">reset email</button>
			</form>
		</div>
	);
};

export default PasswordResetEmailPage;
