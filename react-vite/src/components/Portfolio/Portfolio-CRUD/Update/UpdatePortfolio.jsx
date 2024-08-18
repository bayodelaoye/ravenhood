import { useLoaderData, useNavigate, useFetcher } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useModal } from "../../../../context/Modal";
import "./UpdatePortfolio.css";

const UpdatePortfolio = () => {
	const currentUser = useSelector((state) => state.session.user);
	const { userPortfolios } = useLoaderData();
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const portfolios = userPortfolios.portfolios.map((portfolio) => portfolio);
	const portfolioUrl = parseInt(window.location.href.split("/")[4], 10);
	// const { closeModal } = useModal();
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

	useEffect(() => {
		if (portfolioToUpdate) {
			setPortfolioName(portfolioToUpdate.portfolio_name || "");
		}
	}, [portfolioToUpdate]);

	// const close = async (event) => {
	// 	event.preventDefault();
	// 	closeModal();
	// };

	const onSubmit = async (event) => {
		event.preventDefault();
		const errs = {};

		if (!portfolioName.trim())
			errs.portfolioName = "Portfolio name is required";
		if (!cashBalance || isNaN(cashBalance) || Number(cashBalance) <= 0) {
			errs.cashBalance =
				"Cash balance is required and must be a positive number";
		}

		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		}

		setErrors({});
		fetcher.submit(
			{
				portfolioName,
				cashBalance,
				id: portfolioToUpdate.id,
			},
			{
				method: "put",
				action: `/portfolios/${portfolioToUpdate.id}/edit`,
			},
		);
		navigate(`/portfolios`);
	};

	return (
		<div id="update-portfolio">
			<div id="row-delete-stuff">
				<h2>Edit Portfolio</h2>
			</div>
			<fetcher.Form
				method="put"
				action={`/portfolios/${userId}/edit`}
				onSubmit={onSubmit}
				className="input-style"
			>
				<label>What are we changing the name to?</label>
				<input
					required
					type="text"
					name="portfolioName"
					value={portfolioName}
					onChange={(e) => setPortfolioName(e.target.value)}
					className="name-change-input"
				/>
				{errors.portfolioName && (
					<p style={{ color: "red" }} className="errors">
						{errors.portfolioName}
					</p>
				)}
				<label>How much money would you like to add?</label>
				<input
					required
					type="number"
					name="cashBalance"
					value={cashBalance}
					onChange={(e) => setCashBalance(+e.target.value)}
					className="name-change-input"
				/>
				{errors.cashBalance && (
					<p style={{ color: "red" }} className="errors">
						{errors.cashBalance}
					</p>
				)}
				<input type="hidden" name="id" value={portfolioToUpdate.id} />
				<button
					disabled={portfolioName === "" || cashBalance === 0}
					type="submit"
					// name="intent"
					// value="update-portfolio"
					id="portfolio-update-button"
				>
					Update Portfolio
				</button>
			</fetcher.Form>
		</div>
	);
};

export default UpdatePortfolio;
