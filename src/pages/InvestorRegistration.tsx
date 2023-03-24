import React, { useState, useEffect, useRef } from "react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import axios from "axios";
import { addUser } from "../utils/serverRoutes";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type Props = {};

const InvestorRegistration = (props: Props) => {
	const [rnd1, setRnd1] = useState(Math.floor(Math.random() * 10));
	const [rnd2, setRnd2] = useState(Math.floor(Math.random() * 10));
	const [showPass1, setShowPass1] = useState(false);
	const [showPassConf, setShowPassConf] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [userExists, setUserExists] = useState(false);
	const [buttonDisabledState, setButtonDisabledState] = useState(true);
	const navigate = useNavigate();

	const validationSchema = z
		.object({
			fName: string()
				.min(1, {
					message:
						"Name is required AND needs to be at least 2 characters long",
				})
				.min(2, { message: "must be at least 2 characters long" }),
			sName: string()
				.min(1, {
					message:
						"Name is required AND needs to be at least 2 characters long",
				})
				.min(2, { message: "must be at least 2 characters long" }),
			email: string().email(),
			countryCode: string(),
			telephone: string().min(5, {
				message: "needs to be at least 5 characters long",
			}),
			password: string().min(3, "must be at least 3 characters long"),
			confirm: string().min(3, "must be at least 3 characters long"),
			isHuman: string().min(1, "please prove that you are human"),
		})
		.refine((data) => data.password === data.confirm, {
			message: "Passwords don't match",
			path: ["confirm"],
		})
		.refine((data) => data.countryCode !== "none", {
			message: "please select country code",
			path: ["countryCode"],
		})
		.refine((data) => data.isHuman === String(rnd1 + rnd2), {
			message: "please enter correct sum",
			path: ["isHuman"],
		});

	const { register, control, handleSubmit, formState, watch } = useForm({
		resolver: zodResolver(validationSchema),
	});

	// console.log("watch", watch());

	const { errors } = formState;

	const onSubmit = async (data) => {
		console.log("submitted data", data);

		let res = await axios.post(addUser, data);
		console.log(res.data);

		// if user is ADDED - REDIRECT
		if (res.data === "user_added_successfully") {
			setRedirect(true);
			return;
		}

		// if user already exists
		if (res.data === "user_already_exists") {
			setUserExists(true);
		}
	};

	function handleIsHumanChange() {
		if (watch("isHuman") === String(rnd1 + rnd2)) {
			return;
		}
		setRnd1(Math.floor(Math.random() * 10));
		setRnd2(Math.floor(Math.random() * 10));
	}

	// useEffect(() => {
	// 	console.log("these are all errors", errors.fName);
	// });

	useEffect(() => {
		console.log(watch("fName"));
		if (
			watch("fName") &&
			watch("sName") &&
			watch("email") &&
			watch("countryCode") &&
			watch("telephone") &&
			watch("password") &&
			watch("confirm") &&
			watch("isHuman")
		) {
			setButtonDisabledState(false);
		} else {
			setButtonDisabledState(true);
		}
	}, [watch()]);

	useEffect(() => {
		if (!redirect) {
			return;
		}

		const timeOut = setTimeout(() => {
			navigate("/login");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [redirect]);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setUserExists(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [userExists]);

	//********************************************************************
	//          HTML
	// *******************************************************************

	if (redirect) {
		return (
			<div>
				<h1>User Added Successfully, you are being redirected to Login Page</h1>
				<h2>------------</h2>
			</div>
		);
	}

	return (
		<div>
			<h3>Join today and start investing in minutes.</h3>
			<hr />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p>Name</p>
					<input type="text" {...register("fName")} />
					<div style={{ color: "red" }}>{errors?.fName?.message as string}</div>
				</div>
				<div>
					<p>Second Name</p>
					<input type="text" {...register("sName")} />
					<div style={{ color: "red" }}>{errors?.sName?.message as string}</div>
				</div>
				<div>
					<p>Email</p>
					<input type="text" {...register("email")} />
					<div style={{ color: "red" }}>{errors?.email?.message as string}</div>
					{userExists && (
						<div style={{ color: "red" }}>
							This user already exists TRY AGAIN
						</div>
					)}
				</div>
				<div className="invReg_CountryCodeAndTelephone">
					<div>
						<p>Country code</p>
						<select {...register("countryCode")}>
							<option value="none">please select</option>
							<option value="+353">Ireland</option>
							<option value="+1">usa</option>
						</select>
						<div style={{ color: "red" }}>
							{errors?.countryCode?.message as string}
						</div>
					</div>
					<div>
						<p>Telephone</p>
						<input type="number" {...register("telephone")} />
						<div style={{ color: "red" }}>
							{errors?.telephone?.message as string}
						</div>
					</div>
				</div>
				<div>
					<p>Password</p>
					<input
						type={showPass1 ? "text" : "password"}
						{...register("password")}
					/>
					<button type="button" onClick={() => setShowPass1(!showPass1)}>
						{showPass1 ? "hide" : "show"}
					</button>
					<div style={{ color: "red" }}>
						{errors?.password?.message as string}
					</div>
				</div>
				<div>
					<p>Password Confirm</p>
					<input
						type={showPassConf ? "text" : "password"}
						{...register("confirm")}
					/>
					<button type="button" onClick={() => setShowPassConf(!showPassConf)}>
						{showPassConf ? "hide" : "show"}
					</button>

					<div style={{ color: "red" }}>
						{errors?.confirm?.message as string}
					</div>
				</div>
				<div>
					<p>
						Are you human: {rnd1} + {rnd2}
					</p>
					<input type="number" {...register("isHuman")} />
					<div style={{ color: "red" }}>
						{errors?.isHuman?.message as string}
					</div>
				</div>
				<br />
				<input
					type="submit"
					onClick={handleIsHumanChange}
					disabled={buttonDisabledState}
				/>
			</form>
			<hr />
			<Link to="/login">If you already have an account go to LOGIN PAGE</Link>
		</div>
	);
};

export default InvestorRegistration;
