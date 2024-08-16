import { useLoaderData, Form, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./UpdatePortfolio.css";

const UpdatePortfolio = () => {
	const currentUser = useSelector((state) => state.session.user);
	const { userPortfolios } = useLoaderData();
	// const fetcher = useFetcher();
	const navigate = useNavigate();
	const portfolios = userPortfolios.portfolios.map((portfolio) => portfolio);
	const userId = currentUser.id;

	// Ensure user is logged in
	useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	// Ensure user is the portfolio owner
	useEffect(() => {
		if (currentUser && userPortfolios.id !== currentUser.id) {
			navigate("/");
		}
      }, [userPortfolios, currentUser, navigate]);
      
      // const portfolioToUpdate = 

	const [portfolioName, setPortfolioName] = useState("");
	const [cashBalance, setCashBalance] = useState("");
	const [totalAmount, setTotalAmount] = useState("");
	const [isActive, setIsActive] = useState("");
	const [errors, setErrors] = useState({});

	console.log("portfolios-user", portfolios);

	const onSubmit = async (event) => {
		event.preventDefault();
		const errs = {};
		if (!portfolioName.length)
			errs.portfolioName = "Portfolio name is required";
		if (!cashBalance.length) errs.cashBalance = "Cash balance is required";
		if (!totalAmount.length) errs.totalAmount = "Must have a total amount";
		if (Number(totalAmount) < Number(cashBalance))
			errs.totalAmount = "Total amount cannot be less than your cash balance";
		if (!isActive) errs.isActive = "Portfolio activity selection is required";

		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		} else {
			setErrors({});

			// fetcher.submit(
			// 	{
			// 		portfolioName,
			// 		cashBalance,
			// 		totalAmount,
			// 		isActive,
			// 		userId,
			// 	},
			// 	{
			// 		method: "post",
			// 		action: "/portfolios/new",
			// 	},
			// );
			navigate(`/portfolios/${userId}`);
		}
	};

	return (
		<div id="new-portfolio">
			{currentUser && portfolios ? (
                        <div id="portfolio-section-1">
                              {/* {portfolios.map((portfolio) => (

                              ))} */}
					<h1>Create a portfolio for {userPortfolios.username}</h1>
					<Form
						method="post"
						action="/portfolios/new"
                                    className="create-portfolio"
						onSubmit={onSubmit}
					>
						<input type="hidden" name="user_id" value={userId} />
						<div id="name-input">
							<label>
								What is the name of your portfolio?
								<input
									id="portfolio-name-input"
									type="text"
									name="portfolio_name"
									placeholder="Portfolio Name"
									value={portfolioName}
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
							<label>
								Is this portfolio active?
								<select
									name="is_active"
									id="portfolio-active-select"
									value={isActive}
									onChange={(event) => setIsActive(event.target.value)}
								>
									<option value="">(select one)</option>
									<option value="Active">Active</option>
									<option value="Inactive">Inactive</option>
								</select>
							</label>
							{errors.isActive && (
								<p style={{ color: "red" }} className="errors">
									{errors.isActive}
								</p>
							)}
						</div>
						<hr />
						<div id="total-portfolio-amount">
							<label>
								What is the total amount of your portfolio?
								<input
									id="cash-balance-input"
									type="number"
									min="1"
									step="any"
									name="total_amount"
									placeholder="0"
									value={totalAmount}
									onChange={(event) => setTotalAmount(event.target.value)}
								/>
							</label>
							{errors.totalAmount && (
								<p style={{ color: "red" }} className="errors">
									{errors.totalAmount}
								</p>
							)}
						</div>
						<hr />
						<div id="create-portfolio">
							<button type="submit" id="create-portfolio-submit">
								Create Portfolio
							</button>
						</div>
					</Form>
				</div>
			) : (
				<h1>Please log in to create a portfolio!</h1>
			)}
		</div>
	);
};

export default UpdatePortfolio;
