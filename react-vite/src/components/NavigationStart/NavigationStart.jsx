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
            <NavLink to="/" className="NavigationStartUlLiNavLink">Credit Card</NavLink>
          </li>
          <li className="NavigationStartUlLi">
            <NavLink to="/" className="NavigationStartUlLiNavLink">Gold</NavLink>
          </li>
          <li className="NavigationStartUlLi">
            <NavLink to="/" className="NavigationStartUlLiNavLink">Learn</NavLink>
          </li>
          <li className="NavigationStartUlLi">
            <NavLink to="/" className="NavigationStartUlLiNavLink">Sherwood News</NavLink>
          </li>
          <li className="NavigationStartUlLi">
            <NavLink to="/" className="NavigationStartUlLiNavLink">Support</NavLink>
          </li>

          <li className="NavigationStartUlLi">
              <FlagDropdown />
          </li>

          <li className="NavigationStartUlLi NavigationStartUlLiButtonLi">
            <LoginButton />
          </li>
          <li className="NavigationStartUlLi NavigationStartUlLiButtonLi">
            <SignupButton />
          </li>
        </ul>


      </header>
    </>
  );
}

export default NavigationStart;
