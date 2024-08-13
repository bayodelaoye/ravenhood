import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import Portfolio from "../../Portfolio";

const AuHomePage = () => {
	const currentUser = useSelector((state) => state.session.user);
	const userPortfolios = useLoaderData();
	console.log("current user -->", currentUser);
	console.log("user portfolio ->", userPortfolios);

	return (
		<div id="authorized-user-home">
			<div id="investing">
				<h2>Investing</h2>
			</div>
			{Math.floor(userPortfolios.total_amount) === 0 ? (
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
					</div>
				</div>
			) : (
				<Portfolio />
			)}
		</div>
	);
};

export default AuHomePage;
