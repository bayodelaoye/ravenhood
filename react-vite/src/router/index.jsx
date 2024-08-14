import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import HomePage from "../components/HomePage";
import Layout from "./Layout";
import { userPortfolios } from "../components/loaders/portfolios";
import { modifyPortfolio } from "../components/actions/portfolios";
import Portfolio from "../components/Portfolio";
import { watchlistLoader } from "../components/loaders/watchLists";
import Watchlist from "../components/Watchlist/Watchlist";
import { deleteWatchlist } from "../components/actions/watchLists";
import Invest from "../components/NavigationStart/Offerings/Invest.jsx";
import Crypto from "../components/NavigationStart/Offerings/Crypto.jsx";
import Retirement from "../components/NavigationStart/Offerings/Retirement.jsx";
import Options from "../components/NavigationStart/Offerings/Options.jsx";
import CreditCard from "../components/NavigationStart/Dummies/CreditCard.jsx";
import Gold from "../components/NavigationStart/Dummies/Gold.jsx";
import Learn from "../components/NavigationStart/Dummies/Learn.jsx";
import SherwoodNews from "../components/NavigationStart/Dummies/SherwoodNews.jsx";
import Support from "../components/NavigationStart/Dummies/Support.jsx";



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
				// loader: stocksLoader,
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				element: <SignupFormPage />,
			},
			// {
			// 	path: "users/:id/portfolios",
			// 	loader: userPortfolios,
			// 	element: <Portfolio />,
			// },
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
				path: "watchlist/:user_id/:watchlist_num",
				loader: watchlistLoader,
				element: <Watchlist />,
				action: deleteWatchlist
			},
			{
				path: "/invest",
				element: <Invest />,
			},
			{
				path: "/crypto",
				element: <Crypto />,
			},
			{
				path: "/retirement",
				element: <Retirement />,
			},
			{
				path: "/options",
				element: <Options />,
			},
			{
				path: "/creditcard",
				element: <CreditCard />,
			},
			{
				path: "/gold",
				element: <Gold />,
			},
			{
				path: "/learn",
				element: <Learn />,
			},
			{
				path: "/sherwoodnews",
				element: <SherwoodNews />,
			},
			{
				path: "/support",
				element: <Support />,
			},
			{
				path: "/us",
				children: [


				],
			},


		],
	},
]);
