import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ravenhoodLogoPurple from './Logo/ravenhoodLogoPurple.png';
import SearchBar from "./SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import AccountDropdown from "./AccountDropdown";
// import * as searchActions from "../../spots"

import './Navigation.css';


const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const runSearch = () => {
        async () =>
        await dispatch(searchActions.search()).then(() => navigate(`/'`));
    }

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
                <NavLink id="/" className="TopNavBarNavLink">Account</NavLink>
                <AccountDropdown></AccountDropdown>
            </li>
        </ul>
    </header>
    );
}

export default Navigation;
