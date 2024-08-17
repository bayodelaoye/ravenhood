import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import "./HomePage.css";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import LimitationsModal from "./LimitationsModal";
// import { FaCircleInfo } from "react-icons/fa6";
// import Tilt from "react-parallax-tilt";
// import Footer from "../Footer";
import NuHomePage from "./Nu-HomePage";
import AuHomePage from "./Au-HomePage";
import { useEffect } from "react";
import { userTransactions } from "../../redux/transactions";

const HomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserTransactions = async () => {
      await dispatch(userTransactions(sessionUser.id));
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
