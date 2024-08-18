import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ravenhoodLogoPurple from "./Logo/ravenhoodLogoPurple.png";
import SearchBar from "./SearchBar/SearchBar";
import AccountDropdown from "./AccountDropdown";
import * as navStocksActions from "../../redux/navStocksRedux";
import "./Navigation.css";

// This prop was passed in start: {isLoaded}
const Navigation = () => {
  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(navStocksActions.navStocks());
//   });

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  // ==============account menu show hide logic====================

  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  // ====changes user menu from showing to not showing whichever is opposite at time of click
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
    //   console.log("======================toggleMenu ran");
  };

  //====if showMenu is false nothing happens; else I'm not sure....
  useEffect(() => {
    if (!showMenu) {
      // console.log("===========if !showMenu ran showMenu = ", showMenu);
      return;
    }

    const closeMenu = () => {
      setShowMenu(false);
      // console.log("=================== closeMenu ran")
    };

    document.addEventListener("click", closeMenu);

    //   console.log("=================useEffect ran showMenu = ", showMenu)

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // ========================Search===================================
  // const sessionUser = useSelector(state => state.session.user);
  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  // const runSearch = () => {
  //     async () =>
  //     await dispatch(searchActions.search()).then(() => navigate(`/'`));
  // }

  // ==============================Return================================
  // console.log("NAVIGATION COMPONENT RAN");
  return (
    <header>
      <div id="logoAndSearchBarContainer">
        <NavLink to="/">
          <img id="logo" src={ravenhoodLogoPurple} alt="logo"></img>
        </NavLink>

        <div className="search-bar">
          <SearchBar />
        </div>
      </div>

      <ul id="TopNavBarUl">
        <li>
          <NavLink to={`/portfolios`} className="TopNavBarNavLink">
            Portfolios
          </NavLink>
        </li>
        <li>
          <NavLink to="/watchlist" className="TopNavBarNavLink">
            Watchlists
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/users/${userId}/transactions`}
            className="TopNavBarNavLink"
          >
            Transactions
          </NavLink>
        </li>
        <li>
          <NavLink to="/stocks/" className="TopNavBarNavLink">
            Stocks
          </NavLink>
        </li>
        {/* <li>
                <NavLink to="/retirement2" className="TopNavBarNavLink">Retirement</NavLink>
            </li>
            <li>
                <NavLink to="/notifications" className="TopNavBarNavLink">Notifications</NavLink>
            </li> */}
        <li>
          <button
            onClick={toggleMenu}
            id="TopNavBarToggleDropdownButton"
            className={
              showMenu
                ? "TopNavBarNavLink-p TopNavBarLinkActive"
                : "TopNavBarNavLink-p"
            }
          >
            Account
            {showMenu ? <AccountDropdown id="TopNavBarAccountDropdown" /> : ""}
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Navigation;
