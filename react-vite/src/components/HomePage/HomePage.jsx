import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
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
