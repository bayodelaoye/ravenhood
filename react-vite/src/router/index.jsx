import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import { stocksLoader, allLoader } from "../loaders";
import { watchlistLoader } from "../components/loaders/watchLists";
import Watchlist from "../components/Watchlist/Watchlist";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <h1>Welcome!</h1>,
			},
			{
				path: "login",
				// loader: stocksLoader,
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				loader: allLoader,
				element: <SignupFormPage />,
			},
			{
				path: "watchlist/:user_id/:watchlist_num",
				loader: watchlistLoader,
				element: <Watchlist />
			}

		],
	},
]);
