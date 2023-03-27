export function calculateTotalInterest(
	principle,
	interestRate,
	durationInMonths
) {
	const intR = 1 + interestRate / 100;
	// console.log("intR: ", intR);

	const durY = durationInMonths / 12;

	const test1 = principle * Math.pow(intR, durY) - principle;

	return (test1 / durY).toLocaleString("en-GB", {
		style: "currency",
		currency: "EUR",
	});
}

export function calculateMonthlyRepaymentsRoughly(
	principle,
	interestRate,
	durationInMonths
) {
	const intR = 1 + interestRate / 100;
	// console.log("intR: ", intR);

	const durY = durationInMonths / 12;

	const test1 = (principle * Math.pow(intR, durY)) / durationInMonths;
	// console.log("test1: ", test1);
	return test1.toLocaleString("en-GB", {
		style: "currency",
		currency: "EUR",
	});
}
