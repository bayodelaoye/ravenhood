import { Form } from "react-router-dom";

const DeletePortfolio = ({ onClose, portfolio, user_id }) => (
	<div className="modalbox">
		<div className="row-delete-stuff">
			<button className="deleteClose" onClick={onClose}>
				✖
			</button>
			<h2>Are you sure you want to delete {portfolio.portfolio_name}?</h2>
		</div>
		<Form method="delete" action={`/portfolios/${user_id}`} onSubmit={onClose}>
			<button
				type="submit"
				name="intent"
				value="delete-portfolio"
				className="portfolio-delete-button"
			>
				Confirm
			</button>
			<input type="hidden" name="id" value={portfolio.id} />
		</Form>
	</div>
);

export default DeletePortfolio;
