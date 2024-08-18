import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import HomePage from "../components/HomePage";
import Layout from "./Layout";
import { userPortfolios } from "../components/loaders/portfolios";
import { modifyPortfolio } from "../components/actions/portfolios";
import UserProfilePage from "../components/Profile/UserProfilePage.jsx";
import CreatePortfolio from "../components/Portfolio/Portfolio-CRUD/Create/CreatePortfolio.jsx";
import { createPortfolioAction } from "../components/actions/portfolios";
import UpdatePortfolio from "../components/Portfolio/Portfolio-CRUD/Update/UpdatePortfolio.jsx";
import { updatePortfolioAction } from "../components/actions/portfolios";
import PortfolioDetails from "../components/Portfolio/PortfolioDetails.jsx";
import { watchlistLoader } from "../components/loaders/watchLists";
import Watchlist from "../components/Watchlist/Watchlist";
import { deleteWatchlist } from "../components/actions/watchLists";
import { stockDetailsLoader } from "../components/loaders/stocks";
import WatchlistAll from "../components/Watchlist/WatchlistUser_All";
import StockDetailsPage from "../components/StockDetailsPage";
import Invest from "../components/NavigationStart/Offerings/Invest.jsx";
import Crypto from "../components/NavigationStart/Offerings/Crypto.jsx";
import Retirement from "../components/NavigationStart/Offerings/Retirement.jsx";
import Options from "../components/NavigationStart/Offerings/Options.jsx";
import CreditCard from "../components/NavigationStart/Dummies/CreditCard.jsx";
import Platinum from "../components/NavigationStart/Dummies/Platinum.jsx";
import Learn from "../components/NavigationStart/Dummies/Learn.jsx";
import SherwoodNews from "../components/NavigationStart/Dummies/SherwoodNews.jsx";
import Support from "../components/NavigationStart/Dummies/Support.jsx";
// import Rewards from "../components/Navigation/NavDummies/Rewards.jsx";
// import Crypto2 from "../components/Navigation/NavDummies/Crypto2.jsx";
// import Spending from "../components/Navigation/NavDummies/Spending.jsx";
import Retirement2 from "../components/Navigation/NavDummies/Retirement2.jsx";
import Notifications from "../components/Navigation/NavDummies/Notifications.jsx";
import SearchResults from "../components/Navigation/SearchResults/SearchResults.jsx";
import TransactionsPage from "../components/TransactionPage";
import { userTransactionsLoader } from "../components/loaders/transactions.js";
// import { navStocksLoader } from "../components/loaders/navStocksLoader.js";
import { listStocksLoader } from "../components/loaders/listStocks.js";
import ListStocks from "../components/ListStocks/ListStocks.jsx";
import UpdateProfileModal from "../components/Profile/UpdateProfileModal.jsx";

export const router = createBrowserRouter([
	{
		path: "signup",
		element: <SignupFormPage />,
	},
	{
		path: "login",
		element: <LoginFormPage />,
	},
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				loader: userPortfolios,
				element: <HomePage />,
			},
			{
				path: "/portfolios",
				loader: userPortfolios,
				element: <UserProfilePage />,
				action: modifyPortfolio,
				children: [
					{
						path: "edit",
						element: <UpdateProfileModal />,
					},
				],
			},
			{
				path: "portfolios/new",
				loader: userPortfolios,
				element: <CreatePortfolio />,
				action: createPortfolioAction,
			},
			{
				path: "portfolios/:userId",
				loader: userPortfolios,
				element: <PortfolioDetails />,
				action: modifyPortfolio
			},
			{
				path: "portfolios/:userId/edit",
				loader: userPortfolios,
				element: <UpdatePortfolio />,
				action: updatePortfolioAction,
			},
			{
				path: "portfolios/:userId/edit/cash",
				loader: userPortfolios,
				element: <UpdatePortfolio />,
				action: updatePortfolioAction,
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

      // =============Not Loggedin aka NavigationStart=============
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
        path: "/us",
        // children: [
        // ],
      },
      {
        path: "/creditcard",
        element: <CreditCard />,
      },
      {
        path: "/platinum",
        element: <Platinum />,
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

      // =============Loggedin aka Navigation=============
      {
        path: "/searchResults",
        loader: listStocksLoader,
        element: <SearchResults />,
      },
      // {
      // 	path: "/rewards",
      // 	element: <Rewards />,
      // },
      // {
      // 	path: "/crypto2",
      // 	element: <Crypto2 />,
      // },
      // {
      // 	path: "/spending",
      // 	element: <Spending />,
      // },
      {
        path: "/retirement2",
        element: <Retirement2 />,
      },
      {
        path: "/notifications",
        // element: "Notificaitons Coming Soon",
        element: <Notifications />,
      },
      {
        path: "/stocks/:stockId",
        loader: stockDetailsLoader,
        element: <StockDetailsPage />,
      },
      {
        path: "/stocks/",
        loader: listStocksLoader,
        element: <ListStocks />,
      },
      {
        path: "/users/:userId/transactions",
        element: <TransactionsPage />,
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
