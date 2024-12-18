import { useSelector } from "react-redux";
// import platinum from "./Logo/platinum.png";
import { FaUserCircle } from "react-icons/fa";
// import { FaBriefcase } from "react-icons/fa6";
// import { BsBank2 } from "react-icons/bs";
// import { GrPowerCycle } from "react-icons/gr";
// import { BiSolidReport } from "react-icons/bi";
// import { FaEnvelopesBulk } from "react-icons/fa6";
// import { GiBackwardTime } from "react-icons/gi";
// import { FaGear } from "react-icons/fa6";
// import { BiSolidHelpCircle } from "react-icons/bi";
// import { ImKeyboard } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import * as sessionActions from "../../redux/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AccountDropdown.css";

function AccountDropdown() {
	const sessionUser = useSelector((store) => store.session.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// ===================menu buttons handlers======================

	const handleProfile = (e) => {
		e.preventDefault();
		navigate("/portfolios");
		//     console.log("handleProfile ran");
	};

	const handleLogout = async (e) => {
		e.preventDefault();

		await dispatch(sessionActions.thunkLogout());

		return navigate("/");
	};

	return (
		<>
			<ul id="AccountDropdownUl">
				<li className="AccountDropdownUlLi">
					<p
						className="AccountDropdownName"
						id="AccountDropdownUserName"
					>{`${sessionUser.first_name} ${sessionUser.last_name}`}</p>
				</li>

				{/* <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton">
                        <img
                            id="platinum"
                            className="AccountDropdownIcon"
                            src={platinum}
                            alt="Pt">
                        </img>
                        Robinhood Platinum
                    </button>
                </li> */}

				<li className="AccountDropdownUlLi">
					<button onClick={handleProfile} className="AccountDropdownUlLiButton">
						<FaUserCircle className="AccountDropdownIcon" />
						Profile
					</button>
				</li>

				{/* <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><FaBriefcase className="AccountDropdownIcon" />Investing</button>
                </li>

                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><BsBank2 className="AccountDropdownIcon" />Transfers</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><GrPowerCycle className="AccountDropdownIcon" />Recurring</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><BiSolidReport className="AccountDropdownIcon" />Reports and statements</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><FaEnvelopesBulk className="AccountDropdownIcon" />Tax center</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><GiBackwardTime className="AccountDropdownIcon" />History</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><FaGear className="AccountDropdownIcon" />Settings</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><BiSolidHelpCircle className="AccountDropdownIcon" />Help</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><ImKeyboard className="AccountDropdownIcon" />Keyboard Shortcuts</button>
                </li> */}

				<li className="AccountDropdownUlLi">
					<button
						onClick={handleLogout}
						className="AccountDropdownUlLiButton"
						id="AccountDropdownLogOut"
					>
						<MdLogout className="AccountDropdownIcon" />
						Log Out
					</button>
				</li>
			</ul>
		</>
	);
}

export default AccountDropdown;
