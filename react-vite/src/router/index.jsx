import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import HomePage from "../components/HomePage";
import Layout from "./Layout";
import { userPortfolios } from "../components/loaders/portfolios";
import { modifyPortfolio } from "../components/actions/portfolios";
import Portfolio from "../components/Portfolio";
import Profile from "../components/Profile";
import { watchlistLoader } from "../components/loaders/watchLists";
import Watchlist from "../components/Watchlist/Watchlist";
import { deleteWatchlist } from "../components/actions/watchLists";
import { stockDetailsLoader } from "../components/loaders/stocks";
import WatchlistAll from "../components/Watchlist/WatchlistUser_All";
import StockDetailsPage from "../components/StockDetailsPage";
import FlagDropdown from "../components/NavigationStart/FlagDropdown";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				loader: userPortfolios,
				element: <HomePage />,
			},
			{
				path: "login",
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				element: <SignupFormPage />,
			},
			{
				path: "profile/portfolios",
				loader: userPortfolios,
				element: <Profile />,
			},
			{
				path: "portfolios/new",
				loader: userPortfolios,
				element: <Portfolio />,
				action: modifyPortfolio,
			},
			{
				path: "portfolios/:id",
				loader: userPortfolios,
				element: <Portfolio />,
			},
			{
				path: "portfolios/:id/cash",
				loader: userPortfolios,
				element: <Portfolio />,
				action: modifyPortfolio,
			},
			{
				path: "watchlist/:watchlist_num",
				loader: watchlistLoader,
				element: <Watchlist />,
				action: deleteWatchlist,
			},
			{
				path: "watchlist",
				element: <WatchlistAll />,
				loader: watchlistLoader,
				action: deleteWatchlist,
			},
			{
				path: "/us",
				children: [],
			},
			{
				path: "/creditcard",
				element: <HomePage />,
			},
			{
				path: "/rewards",
				element: <HomePage />,
			},
			{
				path: "/learn",
				element: <HomePage />,
			},
			{
				path: "/news",
				element: <HomePage />,
			},
			{
				path: "/support",
				element: <HomePage />,
			},
			{
				path: "/stocks/:stockId",
				loader: stockDetailsLoader,
				element: <StockDetailsPage />,
			},
			{
				path: "*",
				element: (
					<div>
						<h1>404 Page not found</h1>
						<p>
							Not all those who wander are lost, but it seems you may have taken
							a wrong turn.
						</p>
					</div>
				),
			},
		],
	},
]);
