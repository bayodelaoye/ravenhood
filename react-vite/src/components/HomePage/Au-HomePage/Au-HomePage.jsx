import { useLoaderData, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Portfolio from "../../Portfolio";
import WatchlistAll from "../../Watchlist/WatchlistUser_All";
import "./Au-HomePage.css";

const AuHomePage = () => {
	const currentUser = useSelector((state) => state.session.user);
	const { userPortfolios } = useLoaderData();
	const [currentIndex, setCurrentIndex] = useState(0);
	const portfolios = userPortfolios.portfolios.map((portfolio) => portfolio);
	const totalAmount = portfolios.map((portfolio) => portfolio.total_amount);
	const items = [
		{
			title: "Ravenhood Platinum",
			description:
				"Get access to advanced data, actionable insights, bigger Instant Deposits, and more with Platinum.",
			img: "https://cdn.robinhood.com/card_side_image_asset_v2/ios_24k_announcement/green/1x.png",
			link: "/platinum",
			linkText: "Try Platinum for free",
		},
		{
			title: "Ravenhood Crypto",
			description:
				"Curious about crypto? See which cryptocurrencies you can trade and transfer.",
			img: "https://cdn.robinhood.com/card_side_image_asset_v2/ios_commission_free_crypto/green/1x.png",
			link: "/crypto",
			linkText: "Explore crypto",
		},
		{
			title: "Ravenhood Platinum",
			description:
				"Get $20 when you join Platinum and make a deposit of $2,000 through August 23. Subscription fee and terms apply.",
			img: "https://cdn.robinhood.com/card_side_image_asset_v2/ios_ng_2k_deposit_20/green/1x.png",
			link: "/platinum",
			linkText: "Join Platinum",
		},
		{
			title: "New Feature",
			description:
				"Set custom alerts for technical indicators like MA, RSI, and more.",
			img: "https://cdn.robinhood.com/card_side_image_asset_v2/ios_advanced_indicator_alerts/green/1x.png",
			link: "/notifications",
			linkText: "Get started",
		},
		{
			title: "New Feature",
			description:
				"Filter and focus your search for new investments with stock screeners",
			img: "https://cdn.robinhood.com/card_side_image_asset_v2/ios_screener_launch/green/1x.png",
			link: "/watchlist",
			linkText: "Create a screener",
		},
	];

	const handlePrevClick = () => {
		setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
	};

	const handleNextClick = () => {
		setCurrentIndex(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
	};

	return (
		<div id="authorized-user-home">
			{currentUser && (!portfolios.length || !totalAmount.length) ? (
				<>
					<main id="welcome">
						<div id="portfolio-investing">
							<h2>Investing</h2>
						</div>
						<div id="welcome-image-div">
							<img
								src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/596db67a189aa1843e74.svg"
								alt="welcome-to-ravenhood"
								id="welcome-image"
							/>
						</div>
						<div id="welcome-to-ravenhood">
							<h1>Welcome to Ravenhood</h1>
						</div>
						<div id="welcome-grid">
							<div id="welcome-grid-left">
								<div id="welcome-unlock">
									<h4>Get Started</h4>
									<p>
										Create a portfolio to start investing. Your journey begins
										now!
									</p>
								</div>
								<div id="welcome-fund">
									<Link to="/portfolios/new">
										<button>Create a Portfolio</button>
									</Link>
								</div>
							</div>
							<div id="welcome-grid-right">
								<img
									src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/50c68acacc782dea4f06.svg"
									alt=""
								/>
							</div>
						</div>
						<div id="discover-more">
							<div>
								<h3>Discover more</h3>
							</div>
							<hr />
							<div id="discover-links">
								<div>
									<img
										src="https://cdn.robinhood.com/feature-discovery/features/images/acats-web.png"
										alt=""
									/>
									<h5>Transfer accounts in</h5>
									<p>Consolidate assets</p>
								</div>
								<div>
									<img
										src="https://cdn.robinhood.com/feature-discovery/features/images/gold-web.png"
										alt=""
									/>
									<h5>Earn 5% APY</h5>
									<p>On uninvested cash</p>
								</div>
								<div>
									<img
										src="https://cdn.robinhood.com/feature-discovery/features/images/crypto-web.png"
										alt=""
									/>
									<h5>Crypto</h5>
									<p>Browse Coins</p>
								</div>
								<div>
									<img
										src="https://cdn.robinhood.com/feature-discovery/features/images/joint-accounts-web.png"
										alt=""
									/>
									<h5>Joint accounts</h5>
									<p>Invest together</p>
								</div>
								<div>
									<img
										src="https://cdn.robinhood.com/feature-discovery/features/images/recurring_investments-web.png"
										alt=""
									/>
									<h5>Recurring</h5>
									<p>Buy again</p>
								</div>
							</div>
						</div>
						<div id="get-more">
							<div>
								<h3>Get more out of Ravenhood</h3>
							</div>
							<hr />
							<div id="ravenhood-get-more">
								{items.map((item, index) => (
									<div
										key={index}
										className={`ravenhood-carousel-item ${
											index === currentIndex ? "active" : ""
										}`}
										style={{
											display: index === currentIndex ? "flex" : "none",
										}}
									>
										<img
											src={item.img}
											alt={item.title}
											className="ravenhood-carousel-image"
										/>
										<div className="item-content">
											<h5>{item.title}</h5>
											<p>{item.description}</p>
										</div>
										{/* <Link to={item.link}>{item.linkText}</Link> */}
										<h6>{item.linkText}</h6>
									</div>
								))}
								<div id="carousel-navigation">
									<button className="nav-button prev" onClick={handlePrevClick}>
										◀
									</button>
									<span className="nav-indicator">{`${currentIndex + 1} of ${
										items.length
									}`}</span>
									<button className="nav-button next" onClick={handleNextClick}>
										▶
									</button>
								</div>
							</div>
						</div>
					</main>
				</>
			) : (
				<Portfolio />
			)}
			<aside id="watchlist-sidebar">
				<WatchlistAll />
			</aside>
		</div>
	);
};

export default AuHomePage;
