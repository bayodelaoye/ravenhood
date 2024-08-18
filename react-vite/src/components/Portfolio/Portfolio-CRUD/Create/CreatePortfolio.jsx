import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./CreatePortfolio.css";

const CreatePortfolio = () => {
	const currentUser = useSelector((state) => state.session.user);
	const { userPortfolios } = useLoaderData();
	const fetcher = useFetcher();
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

	const [portfolioName, setPortfolioName] = useState("");
	const [cashBalance, setCashBalance] = useState("");
	const [totalAmount, setTotalAmount] = useState("");
	const [isActive, setIsActive] = useState("");
	const [errors, setErrors] = useState({});

	// console.log("portfolios-user", portfolios);

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

			fetcher.submit(
				{
					portfolioName,
					cashBalance,
					totalAmount,
					isActive,
					userId,
				},
				{
					method: "post",
					action: "/portfolios/new",
				},
			);
			navigate(`/portfolios`);
		}
	};

	return (
		<div id="new-portfolio">
			{currentUser && portfolios ? (
				<div id="portfolio-section-1">
					<h1>Create a portfolio for {userPortfolios.username}!</h1>
					<hr />
					<fetcher.Form
						method="post"
						action="/portfolios/new"
						className="create-portfolio"
						onSubmit={onSubmit}
					>
						<input type="hidden" name="user_id" value={userId} />
						<div id="name-input">
							<h2>Let&apos;s give your portfolio a name!</h2>
							<div id="portfolio-name-div">
								<label>What is the name of your portfolio?</label>
								<input
									id="portfolio-name-input"
									type="text"
									name="portfolio_name"
									placeholder="Portfolio Name"
									value={portfolioName}
									onChange={(event) => setPortfolioName(event.target.value)}
								/>
							</div>
							{errors.portfolioName && (
								<p style={{ color: "red" }} className="errors">
									{errors.portfolioName}
								</p>
							)}
						</div>
						<hr />
						<div id="portfolio-money-details">
							<h2>Let&apos;s give it some money!</h2>
							<div id="portfolio-cash-balance">
								<label>How much would you like to add?</label>
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
							</div>
							{errors.cashBalance && (
								<p style={{ color: "red" }} className="errors">
									{errors.cashBalance}
								</p>
							)}
							<div id="portfolio-active">
								<h2>Choose your activity</h2>
								<div id="portfolio-activity-div">
									<label>Will this portfolio be active?</label>
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
								</div>
								{errors.isActive && (
									<p style={{ color: "red" }} className="errors">
										{errors.isActive}
									</p>
								)}
							</div>
						</div>
						<hr />
						<div id="total-portfolio-amount">
							<h2>What&apos;s the money looking like? </h2>
							<div id="total-balance-input">
								<label>What is the total amount of your portfolio?</label>
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
							</div>
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
					</fetcher.Form>
				</div>
			) : (
				<h1>Please log in to create a portfolio!</h1>
			)}
		</div>
	);
};

export default CreatePortfolio;
