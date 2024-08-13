import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import ravenhoodLogoSilver from "../Navigation/Logo/ravenhoodLogoSilver.png"
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
            <NavLink to="/" className="NavigationStartUlLiNavLink">What We Offer</NavLink>
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
            <NavLink to="/" className="NavigationStartUlLiNavLink">US</NavLink>
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
