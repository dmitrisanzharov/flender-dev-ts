import React, { useEffect, useState } from "react";

type Props = {
	labelTextProp: string;
	placeholderTextProp: string;
	inputTypeProp: string;
	warningTextProp: string;
	inputNameAndHtmlForProp: string;
	inputState: string;
	inputUseState: any;
};

const InputField = ({
	labelTextProp,
	placeholderTextProp,
	inputTypeProp,
	warningTextProp,
	inputNameAndHtmlForProp,
	inputState,
	inputUseState,
}: Props) => {
	// useEffects
	useEffect(() => {}, [inputState]);

	return (
		<div>
			<label htmlFor={inputNameAndHtmlForProp}>{labelTextProp}</label>
			<br />
			<input
				type={inputTypeProp}
				name={inputNameAndHtmlForProp}
				placeholder={placeholderTextProp}
				value={inputState}
				onChange={(e) => inputUseState(e.target.value)}
			/>
			<div className="warningText">{warningTextProp}</div>
		</div>
	);
};

export default InputField;
