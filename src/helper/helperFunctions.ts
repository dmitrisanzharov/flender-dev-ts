import moment from "moment";

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

export function addNotification(type: string, text: string) {
	const fNotificationsFromSession = sessionStorage?.getItem("fNotifications");

	console.log("fNotificationsFromSession: ", fNotificationsFromSession);

	if (
		fNotificationsFromSession === undefined ||
		fNotificationsFromSession === null
	) {
		console.log("not found");
		sessionStorage.setItem(
			"fNotifications",
			JSON.stringify([
				{
					date: moment().format(),
					type: type,
					text: text,
					userNotified: false,
				},
			])
		);
		return;
	}

	if (
		fNotificationsFromSession !== undefined ||
		fNotificationsFromSession !== null
	) {
		console.log("found");
		const allNotifications = JSON.parse(
			sessionStorage.getItem("fNotifications") as string
		);
		console.log("allNotifications: ", allNotifications);
		allNotifications.push({
			date: moment().format(),
			type: type,
			text: text,
			userNotified: false,
		});
		console.log("updatedNotifications: ", allNotifications);
		sessionStorage.setItem("fNotifications", JSON.stringify(allNotifications));
		return;
	}
}

export function notifyUser() {
	if (!sessionStorage.getItem("fNotifications")) {
		return;
	}
	return JSON.parse(sessionStorage.getItem("fNotifications") as string).filter(
		(el) => el.userNotified === false
	);
}

export function setAllNotificationsToTrue() {
	if (!sessionStorage.getItem("fNotifications")) {
		return;
	}
	const final = JSON.parse(
		sessionStorage.getItem("fNotifications") as string
	).map((el) => ({ ...el, userNotified: true }));
	sessionStorage.setItem("fNotifications", JSON.stringify(final));
	return;
}
