import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NuHomePage from "./Nu-HomePage";
import AuHomePage from "./Au-HomePage";
import { useEffect } from "react";
import { userTransactions } from "../../redux/transactions";

const HomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserTransactions = async () => {
      if (sessionUser === null) return;
      await dispatch(userTransactions(sessionUser?.id));
    };

    fetchUserTransactions();
  }, [dispatch]);

  return (
    <>
      {sessionUser ? <AuHomePage /> : <NuHomePage />}
      <Outlet />
    </>
  );
};

export default HomePage;
