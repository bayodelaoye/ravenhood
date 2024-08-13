import { useLoaderData} from "react-router-dom";
import { useSelector } from "react-redux";

const Portfolio = () => {
	const allPortfolios = useLoaderData();
      const currentUser = useSelector((state) => state.session.user);
      // const portfolioDetails = useLoaderData();

      // console.log("check", portfolioDetails);
      

	// // console.log("current user", currentUser);
	// console.log("portfolios", allPortfolios);

	if (allPortfolios === null) {
		return <div>Error loading portfolios. Please try again later.</div>;
	}

	return (
		<div id="port">
			{currentUser ? (
				// Render the portfolios or relevant content here
				<div>
					{allPortfolios.map((portfolio) => (
						<div key={portfolio.id}>{portfolio.portfolio_name}</div>
					))}
				</div>
			) : (
				<div>Please log in to view your portfolios.</div>
			)}
		</div>
	);
};

export default Portfolio;
