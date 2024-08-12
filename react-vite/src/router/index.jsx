import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import { stocksLoader, allLoader } from "../loaders";

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
