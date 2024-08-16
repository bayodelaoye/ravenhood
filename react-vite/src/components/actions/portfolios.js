import { redirect } from "react-router-dom";

export const createPortfolioAction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	data["isActive"] = data.isActive.toLowerCase() === "active";

	const response = await fetch(`/api/portfolios/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user_id: +data.userId,
			portfolio_name: data.portfolioName,
			cash_balance: +data.cashBalance,
			total_amount: +data.totalAmount,
			is_active: data.isActive,
		}),
	});

	if (response.ok) {
		const newPortfolio = await response.json();
		return newPortfolio;
	}
};

export const updatePortfolioAction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
      const intent = formData.get("intent");
      
      // console.log("data", data);
      

      if (intent === "update-portfolio") {
            
            const response = await fetch(`/api/portfolios/${+data.id}`, {
                  method: "PUT",
			headers: {
                        "Content-Type": "application/json",
			},
			body: JSON.stringify({
                        portfolio_name: data.portfolio_name,
				cash_balance: data.cash_balance,
			}),
		});
            // console.log("made it here, hopefully");

		if (response.ok) {
			const message = await response.json();
			return message.message;
			// return redirect("/");
            }
            return null
	}

	// if (intent === "update-portfolio-cash") {
	// 	const response = await fetch(`/api/portfolios/${data.id}/cash`, {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			cash_balance: data.cash_balance,
	// 		}),
	// 	});

	// 	if (response.ok) {
	// 		const message = await response.json();
	// 		console.log(message.message);
	// 		return redirect("/");
	// 	}
	// }

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
};

export const modifyPortfolio = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const intent = formData.get("intent");


	if (intent === "delete-portfolio") {
		const response = await fetch(`/api/portfolios/${data.id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			const message = await response.json();
			return message;

		}

	}

	return "There was an error in updating the portfolio";
};

// export const updateProfilePic = async ({ request }) => {
//       return await fetch(``)
// }
