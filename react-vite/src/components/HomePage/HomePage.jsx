import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NuHomePage from "./Nu-HomePage";
import AuHomePage from "./Au-HomePage";
import { useEffect, useState } from "react";
import { userTransactions } from "../../redux/transactions";

const HomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      if (sessionUser) {
        await dispatch(userTransactions(sessionUser?.id));
        setIsLoaded(true);
      } else {
        setIsLoaded(true);
      }
    };

    fetchUserTransactions();
  }, [dispatch, sessionUser]);

  return (
    <>
      {isLoaded ? <>{sessionUser ? <AuHomePage /> : <NuHomePage />}</> : <></>}
      <Outlet />
    </>
  );
};

export default HomePage;
