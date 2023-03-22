import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import axios from "axios";
import { login } from "../utils/serverRoutes";

type Props = {};

const Login = (props: Props) => {
	const [showPass, setShowPass] = useState(false);

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

		// TODO check if user is found
		const res = await axios.get(
			`${login}?email=${data.email}&pass=${data.pass}`
		);
		console.log(res.data);
	};

	return (
		<div>
			<h1>Flenders Logo</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p>Email</p>
					<input type="text" {...register("email")} />
					<div style={{ color: "red" }}>{errors?.email?.message as string}</div>
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
				</div>
				<br />
				<button type="submit">submit</button>
			</form>
			<hr />
			<Link to="/users/registration/investor">
				If you are NOT REGISTERED, then go to Registration page
			</Link>
		</div>
	);
};

export default Login;
