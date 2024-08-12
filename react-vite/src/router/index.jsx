import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import { stocksLoader, allLoader } from "../loaders";
import StockDetailsPage from "../components/StockDetailsPage";
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
      {
        path: "/stocks/:stockId",
        element: <StockDetailsPage />,
      },
    ],
  },
]);
