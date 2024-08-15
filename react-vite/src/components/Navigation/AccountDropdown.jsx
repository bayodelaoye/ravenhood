import { useSelector } from "react-redux";
import platinum from "./Logo/platinum.png"
import { FaUserCircle } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { GrPowerCycle } from "react-icons/gr";
import { BiSolidReport } from "react-icons/bi";
import { FaEnvelopesBulk } from "react-icons/fa6";
import { GiBackwardTime } from "react-icons/gi";
import { FaGear } from "react-icons/fa6";
import { BiSolidHelpCircle } from "react-icons/bi";
import { ImKeyboard } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import * as sessionActions from "../../redux/session";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "./AccountDropdown.css";




function AccountDropdown(){

    const sessionUser = useSelector((store) => store.session.user);
    const dispatch = useDispatch();




// ======================show hide logic========================



// const dispatch = useDispatch();
const [showMenu, setShowMenu] = useState(false);
const ulRef = useRef();

// ====changes user menu from showing to not showing whichever is opposite at time of click
const toggleMenu = (e) => {
  e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
  setShowMenu(!showMenu);
};



//====if showMenu is false nothing happens; else I'm not sure....
useEffect(() => {
  if (!showMenu) return;
  // ulRef.current && this was in the if on line 27
  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
    setShowMenu(false);
    }
  };

  document.addEventListener('click', closeMenu);

  return () => document.removeEventListener('click', closeMenu);
}, [showMenu]);

const closeMenu = () => setShowMenu(false);



//---if logout is clicked from the user aka showmenu it will run actions to log out and close user menu
// const logout = (e) => {
//   e.preventDefault();
//   dispatch(sessionActions.logout());
//   closeMenu();
// };



// ----this className for ul id=houdini will always be "profile dropdown"
// ----but if show menu is false it will also have class of hidden
// ----hidden changes the visibility to none but im not sure this is doing anything
const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


// //handle Manage Spots - this is hidden button for more action on NavLink to close menue
// const handleManageSpots = (e) => {
// e.preventDefault()
// // e.stopPropagation()
// closeMenu();
// }









// ===================menu buttons handlers======================


    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunkLogout());
        closeMenu();
        console.log("handleLogout ran");
    }


    return(
        <>
            <ul id="AccountDropdownUl">

                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton" id="AccountDropdownUserName">{`${sessionUser.first_name} ${sessionUser.last_name}`}</button>
                </li>

                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><img id="platinum" className="AccountDropdownIcon" src={platinum} alt="platinum"></img>Robinhood Platinum</button>
                </li>

                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><FaUserCircle className="AccountDropdownIcon"/>Profile</button>
                </li>

                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><FaBriefcase className="AccountDropdownIcon"/>Investing</button>
                </li>

                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><BsBank2 className="AccountDropdownIcon"/>Transfers</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><GrPowerCycle className="AccountDropdownIcon"/>Recurring</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><BiSolidReport className="AccountDropdownIcon"/>Reports and statements</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><FaEnvelopesBulk className="AccountDropdownIcon"/>Tax center</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><GiBackwardTime className="AccountDropdownIcon"/>History</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><FaGear className="AccountDropdownIcon"/>Settings</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><BiSolidHelpCircle className="AccountDropdownIcon"/>Help</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button className="AccountDropdownUlLiButton"><ImKeyboard className="AccountDropdownIcon"/>Keyboard Shortcuts</button>
                </li>


                <li className="AccountDropdownUlLi">
                    <button
                        onClick={handleLogout}
                        className="AccountDropdownUlLiButton"
                        id="AccountDropdownLogOut">
                            <MdLogout className="AccountDropdownIcon"/>Log Out
                    </button>
                </li>


            </ul>
        </>
    )
}

export default AccountDropdown;
