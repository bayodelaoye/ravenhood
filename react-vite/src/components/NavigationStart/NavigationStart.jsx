import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import ravenhoodLogoSilver from "../Navigation/Logo/ravenhoodLogoSilver.png"
import "./NavigationStart.css";

function NavigationStart() {
  return (
    <>
      <header id='NavigationStartHeader'>
        <div id="NavigationStartLogoContainer">
          <p id="NavigationStartLogoText">Ravenhood</p>
          <a href="">
              <img id="NavigationStartLogoImg" src={ravenhoodLogoSilver} alt="logo"></img>
          </a>
        </div>
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
          <li className="NavigationStartUlLi">
            <p className="NavigationStartUlLiP">Log in
              <ProfileButton />
            </p>

          </li>
          <li className="NavigationStartUlLi">
            <p className="NavigationStartUlLiP">Log in
              <ProfileButton />
            </p>

          </li>
        </ul>
      </header>
    </>
  );
}

export default NavigationStart;
