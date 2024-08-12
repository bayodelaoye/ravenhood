import { LuUserCircle2 } from "react-icons/lu"
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../session';
// import * as spotsActions from '../../spots';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import {NavLink} from "react-router-dom"

import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };



// ----this className for ul id=houdini will always be "profile dropdown"
// ----but if show menu is false it will also have class of hidden
// ----hidden changes the visibility to none but im not sure this is doing anything
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


 //handle Manage Spots - this is hidden button for more action on NavLink to close menue
 const handleManageSpots = (e) => {
  e.preventDefault()
  // e.stopPropagation()
  closeMenu();
 }

  // console.log('PROFILE BUTTON COMPONENT RAN')
  return (
    <>
      <button onClick={toggleMenu} id="profile-button">
        <LuUserCircle2 id="LuUserCircle2"/>
      </button>

      <ul className={ulClassName} id="houdini" ref={ulRef}>
        {user ? (
          <div id='houdiniLiWrapperDiv'>
            <li >Hello, {user.firstName} {user.lastName}</li>
            <li >{user.username}</li>
            <li >{user.email}</li>
            <li >
              <button id="manageSpotHiddenButton" onClick={handleManageSpots}>
              <NavLink to="/spots/manage" id='manageSpotsNavLink'>Manage Spots</NavLink>
              </button>
            </li>
            <li >
              <button onClick={logout} id="userLogoutButton">Log Out</button>
            </li>
          </div>
        ) : (
          <>
          <ul id="notLoggedIn">
            <li >
              <OpenModalButton
                // className="notLoggedInButton"
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li >
              <OpenModalButton
                // className="notLoggedInButton"
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
            </ul>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
