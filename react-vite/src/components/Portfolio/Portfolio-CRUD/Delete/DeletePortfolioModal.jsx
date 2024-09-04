import { Form } from "react-router-dom";
import { useModal } from "../../../../context/Modal";
import "./DeletePortfolioModal.css"
import { useEffect } from "react";

const DeletePortfolioModal = ({ userPortfolios }) => {
	const { closeModal } = useModal();

	useEffect(() => {
		const handlePageChange = () => {
			// Perform actions when page changes
			closeModal();
		};

		window.addEventListener('popstate', handlePageChange);

		return () => {
			window.removeEventListener('popstate', handlePageChange);
		};
	}, [closeModal]);

	const noDelete = async (event) => {
		event.preventDefault();
		closeModal();
	};

	return (
		<div id="delete-portfolio">
			<div id="portfolio-close-confirm">
				<h1>Confirm Delete</h1>
				<button id="delete-close-button" onClick={noDelete}>
					✖
				</button>
			</div>
			{userPortfolios.portfolios.map((portfolio) => (
				<div key={portfolio.id} id="which-portfolio-to-delete">
					<div>
						<h2>Are you sure you want to delete {portfolio.portfolio_name}?</h2>
					</div>
					<div id="portfolio-delete-buttons">
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
				</div>
			))}
		</div>
	);
};

export default DeletePortfolioModal;
