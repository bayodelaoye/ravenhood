import { useLoaderData, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsStars } from "react-icons/bs";
// import WatchlistAll from "../Watchlist/WatchlistUser_All";
import LineGraph from "../LineGraph";
import "./Portfolio.css";

const Portfolio = () => {
	const { userPortfolios } = useLoaderData();
	const currentUser = useSelector((state) => state.session.user);
	const portfolios = userPortfolios.portfolios.map((portfolio) => portfolio);
	const stockDetails = userPortfolios.portfolios.map((stock) => stock.stocks);
	const totalAmount = portfolios.reduce((acc, curr) => {
		return acc + +curr.total_amount;
	}, 0);

	if (userPortfolios === null) {
		return <div>Error loading portfolios. Please try again later.</div>;
	}

	return (
		<div id="user-portfolio-home">
			{currentUser ? (
				<div id="user-portfolio">
					<div id="try-platinum">
						<h2>
							<BsStars />
							Investing
						</h2>
					</div>

					<div id="user-portfolio-small-deets">
						{/* Fixed this ✅ - Linegraph had an error if there is no stock  */}
						{stockDetails[0] && stockDetails[0][0] ? (
							<>
								<div>
									<h3>Total Amount of all your portfolios: ${totalAmount}</h3>
								</div>
								<LineGraph stock={stockDetails[0][0]} />
								<hr />
								<div id="ravenhood-general-blocks">
									<div>
										<Link to={`/portfolios/${currentUser.id}`}>
											<h4>Edit A Portfolio</h4>
										</Link>
									</div>
								</div>
								<div id="ns-ravenhood-cash">
									<div id="ns-ravenhood-cash-headers-links">
										<h2>Cash</h2>
										<div>
											<Link
												to={`portfolios/${userPortfolios.id}/edit`}
												className="get-more-links"
											>
												Deposit cash
											</Link>
										</div>
									</div>
									<hr />
								</div>
								<div id="ravenhood-earn">
									<div
										style={{
											backgroundColor: `#DFE0E5`,
											display: `flex`,
											alignItems: `center`,
											gap: `50px`,
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
										<p style={{ margin: `0` }}>
											Earn 5% on your uninvested cash. No cap. Terms apply.{" "}
											<span style={{ fontWeight: `bold`, color: `#4D3F72` }}>
												Try Platinum for free
											</span>
										</p>
									</div>
								</div>
								<div id="ns-earning-cash">
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
										</div>
										<hr />
										<div>
											<p>Lifetime interest paid</p>
											<p>$0.00</p>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<div id="ns-lets-make-money">
									<div>
										<img
											src="https://cdn.robinhood.com/app_assets/list_illustrations/crypto/header_web/1x.png"
											alt=""
										/>
									</div>
								</div>
								<div>
									<h3>Get more out of your portfolio</h3>
								</div>
								<hr />
								<div id="ns-get-more-portfolio">
									<Link to="/portfolios/new">
										<h1>MAKE ANOTHER PORTFOLIO</h1>
									</Link>
									<Link to="/stocks">
										<h1>CHOOSE A STOCK</h1>
									</Link>
									<Link to="/watchlist">
										<h1>CREATE A WATCHLIST</h1>
									</Link>
								</div>
								<div id="ravenhood-get-more">
									<div
										className="ravenhood-carousel-item active"
										style={{
											display: "flex",
										}}
									>
										<img
											src="https://cdn.robinhood.com/feature-discovery/features/images/recommendations-web.png"
											alt=""
											className="ravenhood-carousel-image"
										/>
										<div className="item-content">
											<h5>New to Ravenhood</h5>
											<p>
												Welcome to the 24 Hour Market. Trade TSLA, AMZN, and
												other select stocks & ETFs 24 hours a day. Limitations
												and risks apply.
											</p>
										</div>
										{/* <Link to={item.link}>{item.linkText}</Link> */}
										<h6>Learn More</h6>
									</div>
								</div>

								<div id="ns-ravenhood-cash">
									<div id="ns-ravenhood-cash-headers-links">
										<h2>Cash</h2>
										<div>
											<Link
												to={`portfolios/${userPortfolios.id}/edit`}
												className="get-more-links"
											>
												Deposit cash
											</Link>
										</div>
									</div>
									<hr />
								</div>
								<div id="ns-ravenhood-earn">
									<div
										style={{
											backgroundColor: `#DFE0E5`,
											display: `flex`,
											alignItems: `center`,
											gap: `50px`,
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
										<p style={{ margin: `0` }}>
											Earn 5% on your uninvested cash. No cap. Terms apply.{" "}
											<span style={{ fontWeight: `bold`, color: `#4D3F72` }}>
												Try Platinum for free
											</span>
										</p>
									</div>
								</div>
								<div id="ns-earning-cash">
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
										</div>
										<hr />
										<div>
											<p>Lifetime interest paid</p>
											<p>$0.00</p>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			) : (
				<div>Please log in to view your portfolios.</div>
			)}
			{/* <div>
				<WatchlistAll />
			</div> */}
		</div>
	);
};

export default Portfolio;
