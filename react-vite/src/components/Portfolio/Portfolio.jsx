import { useLoaderData, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsStars } from "react-icons/bs";
import WatchlistAll from "../Watchlist/WatchlistUser_All";
import Watchlist from "../Watchlist";

const Portfolio = () => {
	const { userPortfolios } = useLoaderData();
	const { userWatchlists } = useLoaderData();
	const currentUser = useSelector((state) => state.session.user);
	const portfolios = userPortfolios.portfolios.map((portfolio) => portfolio);
	const stockDetails = userPortfolios.portfolios.map((stock) => stock.stocks);


	console.log("portfolio", userPortfolios);
	console.log("Watchlist: ", userWatchlists);
	console.log("stock details", stockDetails);
	console.log("portfolio details", portfolios);

	if (userPortfolios === null) {
		return <div>Error loading portfolios. Please try again later.</div>;
	}

	return (
		<div id="user-portfolio-home">
			{currentUser ? (
				<div id="user-portfolio">
					<div id="try-platinum">
						<button>
							<BsStars />
							Try Platinum
						</button>
					</div>
					{portfolios.map((portfolio) => (
						<div key={portfolio.id} id="user-portfolio-small-deets">
							<div>${portfolio.total_amount}</div>
							<hr />
						</div>
					))}
					{/* BAYODE - LINE GRAPH*/}
					<div id="ravenhood-general-blocks">
						<div>
							<img src="" alt="" />
						</div>
						<div>
							<h4>New to Ravenhood</h4>
							<p>
								Welcome to the 24 Hour Market. Trade TSLA, AMZN, and other
								select stocks & ETFs 24 hours a day. Limitations and risks
								apply.
							</p>
							<Link to="/learn" className="get-more-links">
								Learn more
							</Link>
						</div>
						<div>X</div>
					</div>
					<div id="ravenhood-cash">
						<div id="ravenhood-cash-headers-links">
							<h2>Cash</h2>
							{portfolios.map((portfolio) => (
								<div key={portfolio.id}>
									<Link
										to={`portfolios/${portfolio.id}/cash`}
										className="get-more-links"
									>
										Deposit cash
									</Link>
								</div>
							))}
						</div>
						<hr />
					</div>
					<div id="ravenhood-earn">
						<div
							style={{
								backgroundColor: `#DFE0E5`,
								display: `flex`,
								alignItems: `center`,
								gap: `20px`,
								padding: `1%`,
							}}
						>
							<svg
								className="sparkle-svg"
								width="25px"
								height="25px"
								viewBox="0 0 68 68"
								fill="none"
							>
								<path
									d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
									fill="#4D3F72"
								/>
							</svg>
							<p>
								Earn 5% on your uninvested cash. No cap. Terms apply.{" "}
								<Link
									to="/platinum"
									style={{
										pointer: `cursor`,
										textDecoration: `underline`,
										fontWeight: `bold`,
									}}
								>
									Try Platinum for free
								</Link>
							</p>
						</div>
					</div>
					<div id="earning-cash">
						<div>
							<div>
								<p>Cash earning interest</p>
								<h3>$0.00</h3>
							</div>
							<hr />
							<div>
								<p>Interest rate</p>
								<p>0.01%</p>
							</div>
						</div>
						<div>
							<div>
								<p>Interest accured this month</p>
								<h3>$0.00</h3>
								<div>
									<p>Next payday</p>
									<p>August 30</p>
								</div>
							</div>
							<hr />
							<div>
								<p>Lifetime interest paid</p>
								<p>$0.00</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>Please log in to view your portfolios.</div>
			)}
                  <div>
                        <Watchlist />
				<WatchlistAll />
				Render watchlist to the right of all data above, watchlist is in this
				route, in this component, did not make sure it does not break with other
				users. WORKS FOR DEMO USER
			</div>
			{/* TYLER - WATCHLIST */}
		</div>
	);
};

export default Portfolio;
