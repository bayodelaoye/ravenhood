import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ravenhoodLogoPurple from './Logo/ravenhoodLogoPurple.png';
import SearchBar from "./SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import AccountDropdown from "./AccountDropdown";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
// import * as searchActions from "../../spots"

import './Navigation.css';


const Navigation = ({isLoaded}) => {


// ==============account menu show hide logic====================

const dispatch = useDispatch();
const [showMenu, setShowMenu] = useState(false);
const ulRef = useRef();

// ====changes user menu from showing to not showing whichever is opposite at time of click
const toggleMenu = (e) => {
  e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
  setShowMenu(!showMenu);
  console.log("======================toggleMenu ran");
};



//====if showMenu is false nothing happens; else I'm not sure....
useEffect(() => {
  if (!showMenu) {
    console.log("===========if !showMenu ran showMenu = ", showMenu);

    return;
  }
  // ulRef.current && this was in the if on line 27
  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
    setShowMenu(false);
    }
  };

  document.addEventListener('click', closeMenu);


  console.log("=================useEffect ran showMenu = ", showMenu)
  return () => document.removeEventListener('click', closeMenu);
}, [showMenu]);

// const closeMenu = () => setShowMenu(false);





// ========================Search===================================
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const runSearch = () => {
        async () =>
        await dispatch(searchActions.search()).then(() => navigate(`/'`));
    }







// ==============================Return================================
    // console.log("NAVIGATION COMPONENT RAN");
    return(
     <header>
        <div id='logoAndSearchBarContainer'>
        <a href="">
            <img id="logo" src={ravenhoodLogoPurple} alt="logo"></img>
        </a>

        <SearchBar />
        </div>

        <ul id="TopNavBarUl">
            <li>
                <NavLink to="/" className="TopNavBarNavLink">Rewards</NavLink>
            </li>
            <li>
                <NavLink id="/" className="TopNavBarNavLink">Investing</NavLink>
            </li>
            <li>
                <NavLink id="/" className="TopNavBarNavLink">Crypto</NavLink>
            </li>
            <li>
                <NavLink id="/" className="TopNavBarNavLink">Spending</NavLink>
            </li>
            <li>
                <NavLink id="/" className="TopNavBarNavLink">Retirement</NavLink>
            </li>
            <li>
                <NavLink id="/" className="TopNavBarNavLink">Notifications</NavLink>
            </li>
            <li>


                <button onClick={toggleMenu} id="TopNavBarToggleDropdownButton">
                     <NavLink
                     className={showMenu ? "TopNavBarNavLink TopNavBarLinkActive" : "TopNavBarNavLink"}>Account</NavLink>
                     {showMenu ? <AccountDropdown id="TopNavBarAccountDropdown"></AccountDropdown> : ""}
                </button>

            </li>
        </ul>
    </header>
    );
}

export default Navigation;
