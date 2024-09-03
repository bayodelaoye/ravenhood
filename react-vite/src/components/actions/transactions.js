// import { redirect } from "react-router-dom";

export const createTransaction = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	//   let shares = formData.get("price");
	//   console.log("HERE DATA", data, shares);

	const response = await fetch(`/api/transactions/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			portfolio_id: Number(data["portfolio-type"]),
			type: data["transaction-type"],
			quantity: Number(data["shares"]),
		}),
	});

	if (response.ok) {
		const message = await response.json();
		return message;
	}
};
