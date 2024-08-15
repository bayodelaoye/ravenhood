import { NavLink } from "react-router-dom";
import ravenhoodLogoSilver from "../Navigation/Logo/ravenhoodLogoSilver.png"
import WhatWeOfferDropdown from "./WhatWeOfferDropdown";
import FlagDropdown from "./FlagDropdown";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import "./NavigationStart.css";


function NavigationStart() {



  return (
    <>
      <header id='NavigationStartHeader'>
        <NavLink to='/' id="NavigationStartLogoContainer">
          <p id="NavigationStartLogoText">Ravenhood</p>
          <a href="">
              <img id="NavigationStartLogoImg" src={ravenhoodLogoSilver} alt="logo"></img>
          </a>
        </NavLink>

        <ul id="NavigationStartUl">

          <li className="NavigationStartUlLi">
            <WhatWeOfferDropdown />
          </li>


          <li className="NavigationStartUlLi">
            <NavLink to="/creditcard" className="NavigationStartUlLiNavLink">Credit Card</NavLink>
          </li>
          <li className="NavigationStartUlLi">
            <NavLink to="/platinum" className="NavigationStartUlLiNavLink">Platinum</NavLink>
          </li>
          <li className="NavigationStartUlLi">
            <NavLink to="/learn" className="NavigationStartUlLiNavLink">Learn</NavLink>
          </li>
          <li className="NavigationStartUlLi">
            <NavLink to="/sherwoodnews" className="NavigationStartUlLiNavLink">Sherwood News</NavLink>
          </li>
          <li className="NavigationStartUlLi">
            <NavLink to="/support" className="NavigationStartUlLiNavLink">Support</NavLink>
          </li>

          <li className="NavigationStartUlLi">
              <FlagDropdown />
          </li>

          <li className="NavigationStartUlLi">
            <LoginButton />
          </li>
          <li className="NavigationStartUlLi">
            <SignupButton />
          </li>
        </ul>


      </header>
    </>
  );
}

export default NavigationStart;
