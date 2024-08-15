import { redirect } from "react-router-dom";

export const modifyPortfolio = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const intent = formData.get("intent");

	if (intent === "create-portfolio") {
		const response = await fetch(`/api/portfolios/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: data.user_id,
				portfolio_name: data.portfolio_name,
				cash_balance: data.cash_balance,
				total_amount: data.total_amount,
				is_active: data.is_active,
			}),
		});

		if (response.ok) {
			const newPortfolio = await response.json();
			throw redirect(`/portfolios/${newPortfolio.portfolio.id}`);
		}
	}

	if (intent === "update-portfolio") {
		const response = await fetch(`/api/portfolios/${data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				portfolio_name: data.portfolio_name,
			}),
		});

		if (response.ok) {
			const message = await response.json();
			console.log(message.message);
			return redirect("/");
		}
	}

	if (intent === "update-portfolio-cash") {
		const response = await fetch(`/api/portfolios/${data.id}/cash`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cash_balance: data.cash_balance,
			}),
		});

		if (response.ok) {
			const message = await response.json();
			console.log(message.message);
			return redirect("/");
		}
	}

	if (intent === "update-profile-pic") {
		const response = await fetch(`/api/users/${data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				image: data.image,
				username: data.username,
			}),
		});

		if (response.ok) {
			const message = await response.json();
			console.log(message.message);
			return redirect("/profile/portfolios");
		}
	}

	if (intent === "delete-portfolio") {
		const response = await fetch(`/api/portfolios/${data.id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			const message = await response.json();
			console.log(message.message);
			return redirect("/");
		}
	}

	return "There was an error in updating the portfolio";
};

// export const updateProfilePic = async ({ request }) => {
//       return await fetch(``)
// }
