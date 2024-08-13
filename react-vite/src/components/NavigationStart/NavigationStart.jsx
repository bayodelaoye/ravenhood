import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./NavigationStart.css";

function NavigationStart() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default NavigationStart;
