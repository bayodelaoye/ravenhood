import {
  useLoaderData,
  useNavigate,
  useParams,
  Form,
} from "react-router-dom";
import { useSelector } from "react-redux";

import ConfirmDeleteWatchlist from "./DeleteWatchlistModal";

import { useState, useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";
import NuHomePage from "../HomePage/Nu-HomePage";
import "./style/Watchlist.css";
import ChangeWatchListName from "./ChangeListNameModal";
import CreateWatchList from "./CreateWatchlistModal";

const Watchlist = () => {
  // Grab User's Watchlist
  const { userWatchlists } = useLoaderData();
  // console.log(userWatchlists.watch_lists)
  const { watchlist_num } = useParams();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const { setModalContent, closeModal } = useModal();
  // URL :user_id
  // Current session's user
  const [currentFilter, setCurrentFilter] = useState("none");
  const [showWatchlistDeleteMenu, setshowWatchlistDeleteMenu] = useState(false);
  const [currentList, setCurrentList] = useState([]);
  const ulRef = useRef();


  let currentWatchList;

  if (user) {
    currentWatchList = userWatchlists.watch_lists[watchlist_num - 1];
  }

  useEffect(() => {
    if (currentWatchList) {
      setCurrentList(currentWatchList.stocks);
    }
    setCurrentFilter("none");
    if (!user) {
      return navigate("/");
    }
  }, [userWatchlists, currentWatchList, navigate, user]);

  useEffect(() => {
    if (!showWatchlistDeleteMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setshowWatchlistDeleteMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showWatchlistDeleteMenu]);

  // return (
  //     <div>
  //         <h1>401 Unauthorized</h1>
  //         <p>Not all those who wander are lost, but it seems you may have taken a wrong turn.</p>

  //     </div>
  // )

  // if (!user) {
  //   return (
  //     <div>
  //       <h1>401 Unauthorized</h1>
  //       <p>
  //         Not all those who wander are lost, but it seems you may have taken a
  //         wrong turn.
  //       </p>
  //     </div>
  //   );
  // }
  if (!user) return <NuHomePage />;

  //-----------------------------------DATA--------------------------------------

  if (userWatchlists.watch_lists[watchlist_num - 1] === undefined) {
    return (
      <div>
        <h1>404 Page not found</h1>
        <p>
          Not all those who wander are lost, but it seems you may have taken a
          wrong turn.
        </p>

        <button
          onClick={() => {
            navigate("/watchlist");
          }}
        >
          Go to your Watchlist
        </button>
      </div>
    );
  }

  // Current page's watchlist

  // Total amount of stocks in the current watchlist
  const totalStocks = Object.keys(currentWatchList.stocks).length;

  //---------------------------------BEHAVIOR------------------------------------

  const marketCapConversion = (marketprice_billion) => {
    if (!marketprice_billion) {
      return "N/A";
    }
    // Thousand
    else if (
      marketprice_billion / 1000 >= 1 &&
      marketprice_billion / 1000 < 1000
    ) {
      return `${(marketprice_billion / 1000).toFixed(2)}K`;
    }
    // Million
    else if (
      marketprice_billion / 1000000 >= 1 &&
      marketprice_billion / 1000000 < 1000
    ) {
      return `${(marketprice_billion / 1000000).toFixed(2)}M`;
    }
    // Billion
    else if (
      marketprice_billion / 1000000000 >= 1 &&
      marketprice_billion / 1000000000 < 1000
    ) {
      return `${(marketprice_billion / 1000000000).toFixed(2)}B`;
    }
    // Trillion
    else if (
      marketprice_billion / 1000000000 >= 1 &&
      marketprice_billion / 1000000000000 < 1000
    ) {
      return `${(marketprice_billion / 1000000000).toFixed(2)}T`;
    }

    return "NOT YET";
  };

  function toWatchlist(listid) {
    return () => {
      return navigate(`/watchlist/${listid}`);
    };
  }

  function sortStock(filterby) {
    let sorted;
    if (
      filterby === "name" &&
      currentFilter !== "name" &&
      currentFilter !== "name-reverse"
    ) {
      sorted = [...currentList].sort((a, b) =>
        a.company_name.localeCompare(b.company_name)
      );
      setCurrentFilter("name");
    } else if (filterby === "name" && currentFilter === "name") {
      sorted = [...currentList]
        .sort((a, b) => a.company_name.localeCompare(b.company_name))
        .reverse();
      setCurrentFilter("name-reverse");
    } else if (currentFilter.includes("reverse")) {
      sorted = [...currentWatchList.stocks];
      setCurrentFilter("none");
    } else if (
      filterby === "symbol" &&
      currentFilter !== "symbol" &&
      currentFilter !== "symbol-reverse"
    ) {
      sorted = [...currentList].sort((a, b) =>
        a.ticker_symbol.localeCompare(b.ticker_symbol)
      );
      setCurrentFilter("symbol");
    } else if (filterby === "symbol" && currentFilter === "symbol") {
      sorted = [...currentList]
        .sort((a, b) => a.ticker_symbol.localeCompare(b.ticker_symbol))
        .reverse();
      setCurrentFilter("symbol-reverse");
    } else if (
      filterby === "price" &&
      currentFilter !== "price" &&
      currentFilter !== "price-reverse"
    ) {
      sorted = [...currentList].sort(
        (a, b) => a.current_price - b.current_price
      );
      setCurrentFilter("price");
    } else if (filterby === "price" && currentFilter === "price") {
      sorted = [...currentList]
        .sort((a, b) => a.current_price - b.current_price)
        .reverse();
      setCurrentFilter("price-reverse");
    } else if (
      filterby === "marketcap" &&
      currentFilter !== "marketcap" &&
      currentFilter !== "marketcap-reverse"
    ) {
      sorted = [...currentList].sort(
        (a, b) => a.market_cap_billions - b.market_cap_billions
      );
      setCurrentFilter("marketcap");
    } else if (filterby === "marketcap" && currentFilter === "marketcap") {
      sorted = [...currentList]
        .sort((a, b) => a.market_cap_billions - b.market_cap_billions)
        .reverse();
      setCurrentFilter("marketcap-reverse");
    }

    setCurrentList(sorted);
  }

  function redirectStock(stockid) {
    return navigate(`/stocks/${stockid}`);
  }

  //---------------------------------DROP-DOWNS------------------------------------

  const toggleWatchlistDeleteMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setshowWatchlistDeleteMenu(!showWatchlistDeleteMenu);
  };

  const watchlistdeleteUlClassName =
    "profile-dropdown" + (showWatchlistDeleteMenu ? "" : " hidden");

  // ===================================================================================

  const DropdownComponent = ({ title, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ulRef = useRef();

    const toggleWatchlistDeleteMenu = (e) => {
      e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      // console.log("CLOSEMENU: ", toggleButton, "\n", toggleOpen)
      if (!isOpen) return;

      const closeMenu = () => {
        setIsOpen(false);

        // e.target -> Mouse cursor current
        // ulRef.current -> The window
        // if (ulRef.current && !ulRef.current.contains(e.target)) {
        //     console.log(ulRef.current)
        //     setIsOpen(false);
        // }
      };

      document.addEventListener("click", closeMenu);

      return () => {
        document.removeEventListener("click", closeMenu);
      };
    }, [isOpen]);

    const toggleOpen = "toggle-dropdown" + (isOpen ? "" : " hidden");

    return (
      <div style={{ position: "relative" }}>
        <button
          id={`toggler${value.name}`}
          className="dropdownToggler"
          onClick={toggleWatchlistDeleteMenu}
        >
          {title}
        </button>

        <div
          ref={ulRef}
          className={toggleOpen}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            border: "1px solid black",
            zIndex: 1,
          }}
        >
          <p
            className="editlistbutton"
            onClick={(e) => {
              e.stopPropagation();
              handleChangeNameWatchList(value);
            }}
          >
            Edit List
          </p>
          <p
            type="submit"
            className="delete-watchlist-button-sublist"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteWatchlist(value);
            }}
          >
            Delete List
          </p>
        </div>
      </div>
    );
  };

  // ===================================================================================

  //---------------------------------Modal------------------------------------

  const handleDeleteWatchlist = (watchlist) => {
    setModalContent(
      <div className="curve-radius">
        <ConfirmDeleteWatchlist
          onClose={closeModal}
          watchlist={watchlist}
          totalStocks={Object.keys(watchlist.stocks).length}
          user={user}
        />
      </div>
    );
  };

  const handleChangeNameWatchList = (watchlist) => {
    setModalContent(
      <div>
        <ChangeWatchListName
          onClose={closeModal}
          watchlist={watchlist}
          currentlist={watchlist_num}
        />
      </div>
    );
  };

  // useEffect(() => {
  //     console.log("DATA OF ACTION", actionData)
  // })

  const handleCreateWatchlist = () => {
    setModalContent(
      <div className="modal-container">
        <CreateWatchList
          onClose={closeModal}
          current={watchlist_num}
          className="modal-container"
        />
      </div>
    );
  };

  //---------------------------------------------------------------------------

  return (
    <div className="main-container">
      <div className="row center gap">
        <div className="main-watchlist">
          <div className="icon">
            <h2>💰</h2>
          </div>

          <div className="watchlist-description">
            <div className="watchlist-information">
              <div className="watchlist-name">
                {/* <form>
                                    <input type='text' value={currentWatchList.name}></input>
                                </form>
                                : <h2>{currentWatchList.name}</h2> */}
                <h2>{currentWatchList.name}</h2>
              </div>
              <div className="watchlist-totalstock">
                <p>{totalStocks} items</p>
              </div>
            </div>
            <div className="watchlist-options">
              <div className="watchlist-choices">
                {/* <p>SORT DROPDOWN</p> */}
              </div>
              <div className="watchlist-delete">
                <button
                  className="delete-watchlist-button"
                  onClick={toggleWatchlistDeleteMenu}
                >
                  ...
                </button>

                <div className={watchlistdeleteUlClassName} ref={ulRef}>
                  <button
                    type="submit"
                    className="delete-watchlist-button-confirm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWatchlist(currentWatchList);
                    }}
                  >
                    Delete {currentWatchList.name}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="watchlist-stocks">
            <div className="watchlist-stocks-headers-sort">
              <div className="watchlist-sort-button name">
                <button
                  onClick={() => {
                    sortStock("name");
                  }}
                  className={`sort-button ${currentFilter.includes("name") ? "selected" : ""
                    }`}
                >
                  Name
                </button>
                <p> {currentFilter === "name" ? "🔻" : ""}</p>
                <p> {currentFilter === "name-reverse" ? "🔺" : ""}</p>
              </div>
              <div className="watchlist-sort-button">
                <button
                  onClick={() => sortStock("symbol")}
                  className={`sort-button ${currentFilter.includes("symbol") ? "selected" : ""
                    }`}
                >
                  Symbol
                </button>
                <p> {currentFilter === "symbol" ? "🔻" : ""}</p>
                <p> {currentFilter === "symbol-reverse" ? "🔺" : ""}</p>
              </div>
              <div className="watchlist-sort-button">
                <button
                  onClick={() => sortStock("price")}
                  className={`sort-button ${currentFilter.includes("price") ? "selected" : ""
                    }`}
                >
                  Price
                </button>
                <p> {currentFilter === "price" ? "🔻" : ""}</p>
                <p> {currentFilter === "price-reverse" ? "🔺" : ""}</p>
              </div>
              {/* <div className="watchlist-sort-button">
                                <button className="sort-button">Today</button>
                            </div> */}
              <div className="watchlist-sort-button">
                <button
                  onClick={() => sortStock("marketcap")}
                  className={`sort-button ${currentFilter.includes("marketcap") ? "selected" : ""
                    }`}
                >
                  Market Cap
                </button>
                <p> {currentFilter === "marketcap" ? "🔻" : ""}</p>
                <p> {currentFilter === "marketcap-reverse" ? "🔺" : ""}</p>
              </div>
            </div>
            <div className="watchlist-stocks-details">
              {currentList.map((stock) => (
                <div
                  className="stock"
                  id={`stock${stock.id}`}
                  key={`stock${stock.id}`}
                >
                  <div
                    onClick={() => redirectStock(stock.id)}
                    className="stock-information"
                  >
                    <div className="stock-name">
                      <p>{stock.company_name}</p>
                    </div>
                    <div className="stock-symbol">
                      <p className="stock-link">{stock.ticker_symbol}</p>
                    </div>
                    <div className="stock-symbol">
                      <p className="stock-link">${stock.current_price}</p>
                    </div>
                    {/* <div className="stock-hightoday">
                                                <p className="stock-link">HIGH TODAY %</p>
                                            </div> */}
                    <div className="stock-marketcap">
                      <p className="stock-link">
                        {marketCapConversion(stock.market_cap_billions)}
                      </p>
                    </div>
                  </div>
                  <div className="stock-delete">
                    {/* DELETE USING ACTION */}
                    <Form method="put" action={`/watchlist/${watchlist_num}`}>
                      <button
                        type="submit"
                        name="intent"
                        value="delete-stock"
                        className="stock-link-delete"
                      >
                        ✖
                      </button>
                      <input type="hidden" name="stock_id" value={stock.id} />
                      <input
                        type="hidden"
                        name="watchlist_id"
                        value={currentWatchList.id}
                      />
                    </Form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sub-watchlist">
          <header className="sublist-header">
            <div className="sublist-title">
              <h3>Lists</h3>
            </div>
            <div className="watchlist-add">
              <div className="create-watchlist" ref={ulRef}>
                <button
                  type="submit"
                  className="create-watchlist-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateWatchlist();
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </header>
          <div className="listofwatchlists ">
            {userWatchlists.watch_lists.map((list, index) => (
              <div
                className="row subwatchlist"
                id={`watchlist${list.id}`}
                key={`watchlist${list.id}`}
              >
                <div
                  className="subwatchlist-description row"
                  onClick={toWatchlist(index + 1)}
                >
                  <div className="watchlist-icon">
                    <p>💰</p>
                  </div>
                  <div className="watchlist-name">
                    <p>{list.name}</p>
                  </div>
                </div>

                <div className="subwatchlist-options">
                  <DropdownComponent
                    key={list.id}
                    id={list.id}
                    value={list}
                    title={"..."}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
