import uniqid from "uniqid";

interface IRegistrationPage {
	id: string;
	labelText: string;
	placeholderText: string;
	inputType: string;
	warningText: string;
	inputNameAndHtmlFor: string;
}

export const registrationPageView: IRegistrationPage[] = [
	{
		id: uniqid(),
		labelText: "First Name",
		placeholderText: "Enter first name",
		inputType: "text",
		warningText: "input field can NOT be empty",
		inputNameAndHtmlFor: "firstName",
	},
	{
		id: uniqid(),
		labelText: "Last Name",
		placeholderText: "Enter last name",
		inputType: "text",
		warningText: "input field can NOT be empty",
		inputNameAndHtmlFor: "lastName",
	},
	{
		id: uniqid(),
		labelText: "Email",
		placeholderText: "Enter email",
		inputType: "email",
		warningText: "email must have @ in it",
		inputNameAndHtmlFor: "email",
	},
];
