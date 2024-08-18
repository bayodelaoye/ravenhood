import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation";
import NavigationStart from "../components/NavigationStart";
import * as navStocksActions from "../redux/navStocksRedux.js"

import { useSelector } from "react-redux";

// react-vite/src/redux/navStocksRedux.js

export default function Layout() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(navStocksActions.navStocks());
    console.log("FROM LAYOUT START JSX dispatch(navStocksActions.navStocks());")
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <ModalProvider>
        {sessionUser ? <Navigation /> : <NavigationStart />}
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
