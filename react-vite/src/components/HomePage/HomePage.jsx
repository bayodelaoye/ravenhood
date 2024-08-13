import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import "./HomePage.css";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import LimitationsModal from "./LimitationsModal";
// import { FaCircleInfo } from "react-icons/fa6";
// import Tilt from "react-parallax-tilt";
// import Footer from "../Footer";
import NuHomePage from "./Nu-HomePage";
import AuHomePage from "./Au-HomePage";

const HomePage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	return (
		<>
			{sessionUser ? <AuHomePage /> : <NuHomePage />}
			<Outlet />
		</>
	);
};

export default HomePage;
