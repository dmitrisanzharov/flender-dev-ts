import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {};

type Inputs = {
	firstName: string;
	lastName: string;
	email: string;
	countryCode: string;
	telephone: number;
	password: string;
	passwordConfirmation: string;
};

const InvestorRegistration = (props: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log("submitted data", data);
	};

	return (
		<div>
			<h3>Join today and start investing in minutes.</h3>
			<hr />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>First Name</div>
				<input
					{...register("firstName", { required: true })}
					placeholder="Enter first name"
				/>
				{errors?.firstName?.type === "required" && (
					<div className="warningText">This field is required</div>
				)}
				<hr />
				<div>Last Name</div>
				<input
					{...register("lastName", { required: true })}
					placeholder="Enter last name"
				/>
				{errors?.lastName?.type === "required" && (
					<div className="warningText">This field is required</div>
				)}
				<hr />
				<div>Email</div>
				<input
					{...register("email", { required: true, pattern: /.@\w*\../g })}
					placeholder="Enter email"
				/>
				{errors?.email?.type === "required" && (
					<div className="warningText">This field is required</div>
				)}
				{errors?.email?.type === "pattern" && (
					<div className="warningText">
						please enter valid email address, example: abc@abc.com
					</div>
				)}
				<hr />
				<div>Country Code</div>
				<select
					{...register("countryCode", { required: true, pattern: /\+\d*/g })}
				>
					<option value="select country">Select country</option>
					<option value="ireland">+353</option>
					<option value="uk">+44</option>
					<option value="usa">+1</option>
					<option value="estonia">+372</option>
				</select>
				{errors?.countryCode?.type === "required" && (
					<div className="warningText">This field is required</div>
				)}
				{errors?.countryCode?.type === "pattern" && (
					<div className="warningText">please select country code</div>
				)}
				<hr />

				<input type="submit" />
			</form>
		</div>
	);
};

export default InvestorRegistration;
