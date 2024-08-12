import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import { Layout } from "../../../router"


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [

      {
        path: '/',
        element: <Home />,
        loader: async () => {
          let response = await fetch("/api/stocks");
          let data = await response.json();
          let stocks = data.stocks;

          return stocks;
        }
      },
      {
        path: '/users',
        element: <Users />,
        loader: async () => {
          let repsonse = await fetch("/api/users");
          let data = await response.json();
          let users = data.users;
          return users;
        },
        children: [
            {
                path: '/users/:userId',
                loader: async () => {
                  fetch("/api/users/:userId")

                },
                element: <UserCurrrent />

            },
            {
                path: '/users/:userId/portfolios',
                element: <UserCurrentPortfolios />,
            },
        ]
      },
      {
        path: '/transactions',
        element: <Transactions />,
        loader: async () => {
          let response = await fetch("/api/transactions");
          let data = response.json();
          let transactions = data.transactions;

          return transactions;
        }
      },
      {
        
      }
    ]
  }
])


function App() {

  console.log("APP COMPONENT RAN");
  return <RouterProvider router={router} />;
}

export default App;
