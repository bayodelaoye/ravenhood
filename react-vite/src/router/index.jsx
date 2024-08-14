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
import { stockDetailsLoader } from "../components/loaders/stocks";
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
        path: "/gold",
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
    ],
  },
]);
