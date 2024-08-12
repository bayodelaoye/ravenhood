
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from './Logo/ravenhoodLogo.png';
import ProfileButton from './ProfileButton';
import { IoHome } from "react-icons/io5";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../spots"


// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import LoginFormModal from "../LoginFormModal/LoginFormModal";
// import SignupFormModal from "../SignupFormModal/SignupFormModal";

import './Navigation.css';
import { useEffect } from "react";


const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const runSearch = () => {
        async () =>
        await dispatch(spotsActions.search()).then(() => navigate(`/'`));
    }

    useEffect(() => {

        const runCurrentSpots = () => {
              dispatch(spotsActions.getCurrentUserSpots())
        }

        if(sessionUser) runCurrentSpots()
    })

    useEffect(()=> {

        async () => {
     //    console.log("DISPATCH LINE 21 LAYOUT.jsx");
         return dispatch(spotsActions.search());
        }

       },[dispatch])




    // console.log("NAVIGATION COMPONENT RAN");
    return(
     <header>
        <a href="/">
            <img id="logo" src={logo} alt="logo"></img>
        </a>
        {/* <SearchBar /> */}

        <ul>
            <li>
                {sessionUser ?
                <NavLink to="/spots/new" id="NavLinkToCreateNewSpot">Create a New Spot</NavLink>
                : ""}
            </li>
            <li id="homeLi">
                <NavLink id="NavLinkToHome" ><IoHome onClick={runSearch} id="IoHome"/></NavLink>
            </li>
            {isLoaded && (
            <li>
                <ProfileButton user={sessionUser} />
            </li>
            )}
        </ul>
    </header>
    );
}

export default Navigation;
