import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from "../components/HomePage";
import Layout from './Layout';


import { stocksLoader, allLoader } from "../loaders";
import { watchlistLoader } from "../components/loaders/watchLists";
import Watchlist from "../components/Watchlist/Watchlist";
import { deleteWatchlist } from "../components/actions/watchLists";
import { stockDetailsLoader } from "../components/loaders/stocks";
import StockDetailsPage from "../components/StockDetailsPage";
import WatchlistAll from '../components/Watchlist/WatchlistUser_All';




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
				path: "signup",
				loader: allLoader,
				element: <SignupFormPage />,
			},
			{
				path: "watchlist/:watchlist_num",
				loader: watchlistLoader,
				element: <Watchlist />,
				action: deleteWatchlist
			},
			{
				path: "watchlist",
				element: <WatchlistAll />,
				loader: watchlistLoader,
				action: deleteWatchlist
			},
			{
				path: '*',
				element:
					<div>
						<h1>404 Page not found</h1>
						<p>Not all those who wander are lost, but it seems you may have taken a wrong turn. 🙏</p>
					</div>

			}

		],
	},
]);
