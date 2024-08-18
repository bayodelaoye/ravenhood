import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useModal } from "../../context/Modal";

import DeletePortfolio from "./Portfolio-CRUD/Delete/DeletePortfolio";

const PortfolioDetails = () => {
	const { userPortfolios } = useLoaderData();
	const currentUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();
	const ulRef = useRef();
	const { setModalContent, closeModal } = useModal();
	const [portfolios, setPortfolios] = useState([]);

	useEffect(() => {
		if (currentUser) {
			setPortfolios(userPortfolios.portfolios);
		}
	}, [currentUser, userPortfolios]);

	// Ensure user is logged in
	useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	// Delete current Portfolio

	const handleDeletePortfolio = (portfolio) => {
		setModalContent(
			<div className="curve-radius">
				<DeletePortfolio
					onClose={closeModal}
					portfolio={portfolio}
					user_id={currentUser.id}
				/>
			</div>,
		);
	};

	return (
		<div id="all-user-portfolios">
			<h1>Portfolios</h1>

			{/* Delete Portfolio */}
			{userPortfolios.portfolios.map((portfolio) => (
				<div key={portfolio.id}>
					<h3>{portfolio.portfolio_name}</h3>
					<p>{portfolio.id}</p>
					<div className="delete portfolio-section" ref={ulRef}>
						<button
							type="submit"
							className="delete-portfolio-button"
							onClick={(e) => {
								e.stopPropagation();
								handleDeletePortfolio(portfolio);
							}}
						>
							Delete {portfolio.portfolio_name}
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default PortfolioDetails;
