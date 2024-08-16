import { useLoaderData, Form, useNavigate, useFetcher } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../../../OpenModalButton";
import { useModal } from "../../../../context/Modal";
import UpdatePortfolioModal from "./UpdatePortfolioModal";
import "./UpdatePortfolio.css";

const UpdatePortfolio = () => {
	const currentUser = useSelector((state) => state.session.user);
	const { userPortfolios } = useLoaderData();
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const portfolios = userPortfolios.portfolios.map((portfolio) => portfolio);
      const portfolioUrl = parseInt(window.location.href.split("/")[4], 10);
      const {setModalContent, closeModal} = useModal()

	const userId = currentUser.id;

	// Ensure user is logged in
	useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	const portfolioToUpdate = portfolios.find(
		(portfolio) => portfolio.id === portfolioUrl,
	);

	// Ensure user is the portfolio owner
	useEffect(() => {
		if (
			currentUser &&
			portfolioToUpdate &&
			userPortfolios.id !== currentUser.id
		) {
			navigate("/");
		}
	}, [userPortfolios, currentUser, navigate, portfolioToUpdate]);

	const [portfolioName, setPortfolioName] = useState("");
	const [cashBalance, setCashBalance] = useState("");
	const [errors, setErrors] = useState({});

	// console.log("portfolios-user", portfolios);

	const handleUpdate = (portfolio) => {
		setModalContent(
			<div className="modal-container-box">
				<UpdatePortfolioModal
					onClose={closeModal}
					portfolio={portfolio}
					userId={currentUser.id}
				/>
			</div>
		);
	};
	useEffect(() => {
		if (portfolioToUpdate) {
			setPortfolioName(portfolioToUpdate.portfolio_name || "");
		}
	}, [portfolioToUpdate]);

	const onSubmit = async (event) => {
		event.preventDefault();
		const errs = {};
		if (!portfolioName.length)
			errs.portfolioName = "Portfolio name is required";
		if (!cashBalance.length) errs.cashBalance = "Cash balance is required";

		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		} else {
			setErrors({});

			fetcher.submit(
				{
					portfolioName,
					cashBalance,
				},
				{
					method: "post",
					action: `/portfolios/${portfolioToUpdate}/edit`,
				},
			);
			navigate(`/portfolios/${userId}`);
		}
	};

	return (
		<div id="update-portfolio">
			{currentUser ? (
                        <div id="portfolio-section-1">
                              {portfolios.map((portfolio) => (
                                    <div key={portfolio.id}>
                                          <div>
                                                <h2>{portfolio.portfolio_name}</h2>
                                          </div>
                                          <div>
                                                <p>
                                                      Total portfolio value
                                                </p>
                                          </div>
                                          <button type="submit" className="update-modal" onClick={(e) => { e.stopPropagation(); handleUpdate(portfolio) }}>Update</button>
                                    </div>
                              ))}
					{/* <Form
						method="post"
						action={`/portfolios/${portfolioUrl}`}
						className="create-portfolio"
						onSubmit={onSubmit}
					>
						{portfolios.map((portfolio) => (
							<div key={portfolioToUpdate}>
								<h1>Update your portfolio for {portfolio.portfolio_name}</h1>

								<input type="hidden" name="user_id" value={userId} />
								<div id="name-input" key={portfolio.id}>
									<label>
										What is the name of your portfolio?
										<input
											id="portfolio-name-input"
											type="text"
											name="portfolio_name"
											placeholder="Portfolio Name"
											value={portfolio.portfolio_name}
											onChange={(event) => setPortfolioName(event.target.value)}
										/>
									</label>
									{errors.portfolioName && (
										<p style={{ color: "red" }} className="errors">
											{errors.portfolioName}
										</p>
									)}
								</div>
								<hr />
								<div id="portfolio-details">
									<label>
										How much would you like to add?
										<input
											id="cash-balance-input"
											type="number"
											min="1"
											step="any"
											name="cash_balance"
											placeholder="0"
											value={cashBalance}
											onChange={(event) => setCashBalance(event.target.value)}
										/>
									</label>
									{errors.cashBalance && (
										<p style={{ color: "red" }} className="errors">
											{errors.cashBalance}
										</p>
									)}
				
								</div>
							
								<hr />
								<div id="update-portfolio">
									<button type="submit" id="create-portfolio-submit">
										Update Portfolio
									</button>
								</div>
							</div>
						))}
					</Form> */}
				</div>
			) : (
				<h1>Please log in to create a portfolio!</h1>
			)}
		</div>
	);
};

export default UpdatePortfolio;
