import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from './Logo/ravenhoodLogo.png';
import SearchBar from "./SearchBar/SearchBar";
import { useDispatch } from "react-redux";
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
        <a href="/">
            <img id="logo" src={logo} alt="logo"></img>
        </a>

        <SearchBar />
        </div>

        <ul id="TopNavBarUl">
            <li>
                <NavLink to="/api/portfolios" className="TopNavBarNavLink">Rewards</NavLink>
            </li>
            <li>
                <NavLink id="/api/portfolios" className="TopNavBarNavLink">Investing</NavLink>
            </li>
            <li>
                <NavLink id="/api/portfolios" className="TopNavBarNavLink">Crypto</NavLink>
            </li>
            <li>
                <NavLink id="/api/portfolios" className="TopNavBarNavLink">Spending</NavLink>
            </li>
            <li>
                <NavLink id="/api/portfolios" className="TopNavBarNavLink">Retirement</NavLink>
            </li>
            <li>
                <NavLink id="/api/portfolios" className="TopNavBarNavLink">Notifications</NavLink>
            </li>
            <li>
                <NavLink id="/api/portfolios" className="TopNavBarNavLink">Account</NavLink>
            </li>
        </ul>
    </header>
    );
}

export default Navigation;
