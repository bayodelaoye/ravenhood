import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomePage.css";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";


const HomePage = () => {
      const sessionUser = useSelector((state) => state.session.user);
      console.log(sessionUser);
	return <h1>Welcome!</h1>;
};

export default HomePage;
