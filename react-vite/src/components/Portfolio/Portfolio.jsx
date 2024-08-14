import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsStars } from "react-icons/bs";

const Portfolio = () => {
	const userPortfolio = useLoaderData();
	const currentUser = useSelector((state) => state.session.user);
      const stockDetails = userPortfolio.map((portfolio) => portfolio.stocks)

      console.log("user portfolio", userPortfolio);
      console.log("stock details", stockDetails);
      

	if (userPortfolio === null) {
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
					{userPortfolio.map((portfolio) => (
						<div key={portfolio.id} id="user-portfolio-small-deets">
							${portfolio.total_amount}
						</div>
					))}
				</div>
			) : (
				<div>Please log in to view your portfolios.</div>
			)}
		</div>
	);
};

export default Portfolio;
