import React, { useState } from "react";

// view
import { registrationPageView } from "../view/inputFieldsView";

// components
import InputField from "../components/InputField";

type Props = {};

const InvestorRegistration = (props: Props) => {
	// STATES
	const [firstNameState, setFirstNameState] = useState<string>("");
	const [lastNameState, setLastNameState] = useState<string>("");
	const [emailState, setEmailState] = useState<string>("");

	// FUNCTIONS
	function chooseState(arg: string): [string, Function] {
		if (arg === "firstName") {
			return [firstNameState, setFirstNameState];
		}

		if (arg === "lastName") {
			return [lastNameState, setLastNameState];
		}

		if (arg === "email") {
			return [emailState, setEmailState];
		}

		return [
			"PLEASE CHECK ARRAY, SOMETHING IS MISSING",
			(dummyArg) => alert(dummyArg),
		];
	}

	// useEffects

	// HTML TEMPLATE

	return (
		<div>
			<h3>Join today and start investing in minutes.</h3>
			<hr />
			{registrationPageView?.map((el) => {
				const {
					id,
					labelText,
					placeholderText,
					inputType,
					warningText,
					inputNameAndHtmlFor,
				} = el;
				return (
					<div key={id}>
						<br />
						<InputField
							labelTextProp={labelText}
							placeholderTextProp={placeholderText}
							inputTypeProp={inputType}
							warningTextProp={warningText}
							inputNameAndHtmlForProp={inputNameAndHtmlFor}
							inputState={chooseState(inputNameAndHtmlFor)[0]}
							inputUseState={chooseState(inputNameAndHtmlFor)[1]}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default InvestorRegistration;
