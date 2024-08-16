import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation";
import NavigationStart from "../components/NavigationStart";
import { useSelector } from "react-redux";


export default function Layout() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <ModalProvider>
        {/* {sessionUser ? <Navigation /> : <NavigationStart />} */}
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
