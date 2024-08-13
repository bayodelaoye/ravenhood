import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from "../components/HomePage";
import Layout from './Layout';


import { stocksLoader, allLoader } from "../loaders";
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
                        loader: stocksLoader,
				element: <LoginFormPage />,
			},
			{
                        path: "signup",
                        loader: allLoader,
				element: <SignupFormPage />,
			},
		],
	},
]);
