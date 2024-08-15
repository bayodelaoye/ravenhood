import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import ConfirmDeleteWatchlist from "./DeleteWatchlistModal";

import { useState, useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";

import './style/Subwatchlist.css'
import ChangeWatchListName from "./ChangeListNameModal";
import CreateWatchListAll from "./CreateWatchlistModalAll";


const WatchlistAll = () => {
    const navigate = useNavigate();
    // URL :user_id
    // Current session's user
    const user = useSelector((state) => state.session.user);
    const ulRef = useRef();
    const { setModalContent, closeModal } = useModal();



    //-----------------------------------DATA--------------------------------------

    // Grab User's Watchlist
    const watchlist = useLoaderData();

    const [updatedList, setUpdatedList] = useState(watchlist);

    useEffect(() => {
        setUpdatedList(watchlist)
    }, [watchlist])


    //---------------------------------Modal------------------------------------


    function toWatchlist(listid) {
        return () => {
            return navigate(`/watchlist/${listid - 1}`)
        }
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
        )

    }

    const handleChangeNameWatchList = (watchlist) => {
        setModalContent(
            <div className="modal-container-box">
                <ChangeWatchListName
                    onClose={closeModal}
                    watchlist={watchlist}
                />
            </div>
        )
    }

    const handleCreateWatchlist = () => {
        setModalContent(
            <div>
                <CreateWatchListAll
                    onClose={closeModal}
                />
            </div>
        )
    }


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

            document.addEventListener('click', closeMenu);


            return () => {
                document.removeEventListener("click", closeMenu)
            };
        }, [isOpen]);

        const toggleOpen = "toggle-dropdown" + (isOpen ? "" : " hidden");

        return (
            <div style={{ position: 'relative' }}>
                <button id={`toggler${value.name}`} className="dropdownToggler" onClick={toggleWatchlistDeleteMenu}>{title}</button>

                <div ref={ulRef} className={toggleOpen} style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', border: '1px solid black', zIndex: 1 }}>
                    <p className='editlistbutton' onClick={(e) => { e.stopPropagation(); handleChangeNameWatchList(value) }}>Edit List</p>
                    <p type='submit' className="delete-watchlist-button-sublist" onClick={(e) => { e.stopPropagation(); handleDeleteWatchlist(value); }}>Delete List</p>
                </div>

            </div>
        );
    };


    return (
        <div className="center">
            <div className="sub-watchlist-main">
                <header className="sublist-header">
                    <div className="sublist-title">
                        <h2>{user.first_name}'s Watchlists </h2>
                        <p>{watchlist.length} Items</p>
                    </div>
                    <div className="watchlist-add">
                        <div className="create-watchlist" ref={ulRef}>
                            <button type='submit' className="create-watchlist-button" onClick={(e) => { e.stopPropagation(); handleCreateWatchlist(); }}>+</button>
                        </div>
                    </div>
                </header>
                {
                    updatedList.map((list) => (
                        <div
                            className='row subwatchlists spread-outer'
                            id={`watchlist${list.id}`}
                            key={`watchlist${list.id}`}
                            onClick={toWatchlist(list.id)}

                        >
                            <div className="subwatchlist-description row" >
                                <div className="watchlist-icon">
                                    <p>💰</p>
                                </div>
                                <div className="watchlist-name subwatchlist-name">
                                    <p>{list.name}</p>
                                </div>
                            </div>

                            <div className="subwatchlist-options">
                                <DropdownComponent key={list.id} id={list.id} value={list} title={"..."} />

                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}




export default WatchlistAll
