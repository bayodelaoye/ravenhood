import { Form } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";

const DeletePortfolioModal = ({ usersPortfolios, navigate }) => {
      const { closeModal } = useModal();
      const currentUser = useSelector((state) => state.session.user);

	// const yesDelete = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		const response = await fetch(`/api/groups/${groupDetail.id}`, {
	// 			method: "DELETE",
	// 		});

	// 		if (response.ok) {
	// 			console.log("Portfolio deleted successfully");
	// 			closeModal();
	// 			navigate("/portfolios");
	// 		} else {
	// 			console.error("Failed to delete the portfolio");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error:", error);
	// 	}
	// };

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
			{usersPortfolios.portfolios.map((portfolio) => (
				<>
					<h2>Are you sure you want to delete {portfolio.portfolio_name}?</h2>
					<Form
						method="delete"
						action={`/portfolios/${currentUser.id}`}
						onSubmit={noDelete}
					>
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
				</>
			))}
		</div>
	);
};

export default DeletePortfolioModal;
