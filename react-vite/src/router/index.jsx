import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import HomePage from "../components/HomePage";
import Layout from "./Layout";

import { stocksLoader, allLoader } from "../loaders";
import { watchlistLoader } from "../components/loaders/watchLists";
import Watchlist from "../components/Watchlist/Watchlist";
import { deleteWatchlist } from "../components/actions/watchLists";
import { stockDetailsLoader } from "../components/loaders/stocks";
import StockDetailsPage from "../components/StockDetailsPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        // loader: stocksLoader,
        element: <LoginFormPage />,
      },
      {
        path: "/stocks/:stockId",
        loader: stockDetailsLoader,
        element: <StockDetailsPage />,
      },
      {
        path: "watchlist/:user_id/:watchlist_num",
        loader: watchlistLoader,
        element: <Watchlist />,
        action: deleteWatchlist,
      },
    ],
  },
]);
