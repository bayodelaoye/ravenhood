import { Form } from "react-router-dom";
import { useModal } from "../../../../context/Modal";

const DeletePortfolioModal = ({ userPortfolios }) => {
	const { closeModal } = useModal();

	const noDelete = async (event) => {
		event.preventDefault();
		closeModal();
	};

	return (
		<div id="deleteMenu">
			<h1>Confirm Delete</h1>
			<div className="row-delete-stuff">
				<button className="deleteClose" onClick={noDelete}>
					✖
				</button>
			</div>
			<div id="which-portfolio-to-delete">
				<h2>Which portfolio would you like to delete?</h2>
			</div>
			{userPortfolios.portfolios.map((portfolio) => (
				<>
					<div>
						<h2>Are you sure you want to delete {portfolio.portfolio_name}?</h2>
					</div>
					<div>
						<Form method="delete" action={`/portfolios`} onSubmit={closeModal}>
							<button
								type="submit"
								name="intent"
								style={{ backgroundColor: "red" }}
								value="delete-portfolio"
								className="portfolio-delete-button"
							>
								Yes (Delete Portfolio)
							</button>
							<button
								id="button-text"
								style={{ backgroundColor: "darkgray" }}
								onClick={noDelete}
							>
								No (Keep Portfolio)
							</button>
							<input type="hidden" name="id" value={portfolio.id} />
						</Form>
					</div>
				</>
			))}
		</div>
	);
};

export default DeletePortfolioModal;
