import { useLoaderData, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Portfolio from "../../Portfolio";
import Watchlist from "../../Watchlist";

const AuHomePage = () => {
	const currentUser = useSelector((state) => state.session.user);
	const userPortfolios = useLoaderData();

	return (
		<div id="authorized-user-home">
			<div id="investing">
				<h2>Investing</h2>
			</div>
			{currentUser.id === userPortfolios.user_id &&
			Math.floor(userPortfolios.total_amount) === 0 ? (
				<div id="welcome">
					<div id="welcome-image-div">
						<img src="" alt="" id="welcome-image" />
					</div>
					<div id="welcome-to-ravenhood">
						<h1>Welcome to Ravenhood</h1>
					</div>
					<div id="welcome-grid">
						<div id="welcome-grid-left">
							<div id="welcome-unlock">
								<h4>Unlock your free stock</h4>
								<p>Add funds to claim your free stock. Limitations apply.</p>
							</div>
							<div id="welcome-fund">
								<button>Fund Account</button>
							</div>
						</div>
						<div id="welcome-grid-right">
							<img src="" alt="" />
						</div>
					</div>
					<div id="discover-more">
						<div>
							<h3>Discover more</h3>
						</div>
						<div id="discover-links">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
					<div id="get-more">
						<div>
							<h3>Get more out of Ravenhood</h3>
						</div>
						<hr />
						<div id="ravenhood-get-more">
							<div>
								<img src="" alt="" />
							</div>
							<div>
								<h4>Ravenhood Crypto</h4>
								<p>
									Curious about crypto? See which cryptocurrencies you can trade
									and transfer.
								</p>
								<Link to="/crypto" id="cryto-link" className="get-more-links">
									Explore crypto
								</Link>
							</div>
							<div>X</div>
							<div>
								<img src="" alt="" />
							</div>
							<div>
								<h4>Ravenhood Platinum</h4>
								<p>
									Get $20 when you join Platinum and make a deposit of $2,000
									through August 23. Subscription fee and terms apply.
								</p>
								<Link to="/rewards" className="get-more-links">
									Join Platinum
								</Link>
							</div>
							<div>X</div>
							<div>
								<img src="" alt="" />
							</div>
							<div>
								<h4>New Feature</h4>
								<p>
									Set custom alerts for technical indicators like MA, RSI, and
									more.
								</p>
								<Link to="/stocks/create-alert" className="get-more-links">
									Get started
								</Link>
							</div>
							<div>X</div>
						</div>
					</div>
					<div id="watchlist-sidebar">
						<Watchlist />
					</div>
				</div>
			) : (
				<Portfolio />
			)}
		</div>
	);
};

export default AuHomePage;
