import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ConfirmDeleteWatchlist from "./DeleteWatchlistModal";

import { useState, useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";
import NuHomePage from "../HomePage/Nu-HomePage";
import "./style/Subwatchlist.css";
import ChangeWatchListName from "./ChangeListNameModal";
import CreateWatchListAll from "./CreateWatchlistModalAll";

const WatchlistAll = () => {
  const navigate = useNavigate();
  // URL :user_id
  // Current session's user MUST CHANGE
  const user = useSelector((state) => state.session.user);
  const ulRef = useRef();
  const { setModalContent, closeModal } = useModal();

  //-----------------------------------DATA--------------------------------------

  // Grab User's Watchlist
  const { userWatchlists } = useLoaderData();
  //     console.log(userWatchlists.watch_lists)

  const [updatedList, setUpdatedList] = useState([]);

  useEffect(() => {
    setUpdatedList(userWatchlists.watch_lists);
    if (!user) {
      return navigate("/");
    }
  }, [userWatchlists]);

  if (!user) return <NuHomePage />;

  // return (
  //     <div>
  //         <h1>401 Unauthorized</h1>
  //         <p>Not all those who wander are lost, but it seems you may have taken a wrong turn.</p>

  //     </div>
  // )

  //---------------------------------Modal------------------------------------

  function toWatchlist(listid) {
    return () => {
      return navigate(`/watchlist/${listid}`);
    };
  }

  const handleDeleteWatchlist = (watchlist) => {
    setModalContent(
      <div>
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
      <div className="modal-container-box">
        <ChangeWatchListName
          onClose={closeModal}
          watchlist={watchlist}
          currentlist=""
        />
      </div>
    );
  };

  const handleCreateWatchlist = () => {
    setModalContent(
      <div>
        <CreateWatchListAll onClose={closeModal} />
      </div>
    );
  };

  // =========================================================================

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
      <div>
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
            backgroundColor: "white",
            border: "1px solid black",
            zIndex: "auto",
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

  return (
    <div className="center">
      <div className="sub-watchlist-main">
        <header className="sublist-header">
          <div className="sublist-title">
            <h2>{user?.first_name}&apos;s Watchlists </h2>
            <p>{userWatchlists?.watch_lists?.length} Items</p>
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
        {updatedList.map((list, index) => (
          <div
            className="row subwatchlists spread-outer"
            id={`watchlist${list.id}`}
            key={`watchlist${list.id}`}
            onClick={toWatchlist(index + 1)}
          >
            <div className="subwatchlist-description row">
              <div className="watchlist-icon">
                <p>💰</p>
              </div>
              <div className="watchlist-name">
                <p>{list.name}</p>
              </div>
            </div>
            {/* added an index */}
            <div className="subwatchlist-options">
              <DropdownComponent
                style={{ zIndex: 0 }}
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
  );
};

export default WatchlistAll;
