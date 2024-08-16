import { Form } from "react-router-dom";
import { useState } from "react";

const UpdatePortfolioModal = ({ onClose, portfolio, userId }) => {
	const [portfolioName, setPortfolioName] = useState(portfolio.portfolio_name);
	const [cashBalance, setCashBalance] = useState(+portfolio.cash_balance);

      // console.log("cash", typeof cashBalance);
      
	return (
		<div className="update-portfolio">
			<div className="row-delete-stuff spread-out">
				<button className="deleteClose" onClick={onClose}>
					✖
				</button>
				<h2>Edit List</h2>
			</div>
			<Form
				method="put"
				action={`/portfolios/${userId}/edit`}
				onSubmit={onClose}
				className="input-style"
			>
				<input
					required
					type="text"
					name="portfolio_name"
					value={portfolioName}
					onChange={(e) => setPortfolioName(e.target.value)}
					className="name-change-input"
				/>
				<input
					required
					type="number"
					name="cash_balance"
					value={cashBalance}
					onChange={(e) => setCashBalance(+e.target.value)}
					className="name-change-input"
				/>
				<input type="hidden" name="id" value={portfolio.id} />
				<button
					disabled={portfolioName === "" || cashBalance === 0}
					type="submit"
					name="intent"
					value="update-portfolio"
					className="portfolio-update-button"
				>
					Save
				</button>
			</Form>
		</div>
	);
};

export default UpdatePortfolioModal;
