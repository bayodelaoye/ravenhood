import { useLoaderData, useNavigate, useParams, Form } from "react-router-dom";
import { useSelector } from "react-redux";


import ConfirmDeleteWatchlist from "./DeleteWatchlistModal";

import { useState, useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";

import './Watchlist.css'
import ChangeWatchListName from "./ChangeListNameModal";


const Watchlist = () => {
    const navigate = useNavigate();
    // URL :user_id
    const { user_id, watchlist_num } = useParams()
    // Current session's user
    const user = useSelector((state) => state.session.user);

    // Validator - INVALID USER
    if (user_id != user.id) {
        return (
            <h1>INVALID PERMISSIONS</h1>
        )
    }

    //-----------------------------------DATA--------------------------------------

    // Grab User's Watchlist
    const watchlist = useLoaderData();
    // Current page's watchlist
    const currentWatchList = watchlist[watchlist_num - 1]
    // Total amount of stocks in the current watchlist
    const totalStocks = Object.keys(currentWatchList.stocks).length

    //---------------------------------BEHAVIOR------------------------------------


    function toWatchlist(listid) {
        return () => {
            return navigate(`/watchlist/${user.id}/${listid}`)
        }
    }




    //---------------------------------DROP-DOWNS------------------------------------
    const [showWatchlistDeleteMenu, setshowWatchlistDeleteMenu] = useState(false);

    const ulRef = useRef();

    const toggleWatchlistDeleteMenu = (e) => {
        e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
        setshowWatchlistDeleteMenu(!showWatchlistDeleteMenu);
    };

    useEffect(() => {
        if (!showWatchlistDeleteMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setshowWatchlistDeleteMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showWatchlistDeleteMenu]);

    const watchlistdeleteUlClassName = "profile-dropdown" + (showWatchlistDeleteMenu ? "" : " hidden");

    // ===================================================================================

    const DropdownComponent = ({ title, value }) => {
        const [isOpen, setIsOpen] = useState(false);
        const ulRef = useRef();

        const toggleWatchlistDeleteMenu = (e) => {
            e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
            setIsOpen(!isOpen);
        };

        useEffect(() => {
            if (!isOpen) return;

            const closeMenu = (e) => {
                if (ulRef.current && !ulRef.current.contains(e.target)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('click', closeMenu);

            return () => document.removeEventListener("click", closeMenu);
        }, [isOpen]);

        const toggleOpen = "toggle-dropdown" + (isOpen ? "" : " hidden");

        return (
            <div style={{ position: 'relative' }}>
                <button onClick={toggleWatchlistDeleteMenu}>{title}</button>

                <div ref={ulRef} className={toggleOpen} style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', border: '1px solid black', zIndex: 1 }}>
                    <p onClick={(e) => { e.stopPropagation(); handleChangeNameWatchList(value) }}>Edit List</p>
                    <p type='submit' className="delete-watchlist-button" onClick={(e) => { e.stopPropagation(); handleDeleteWatchlist(value); }}>Delete List</p>
                </div>

            </div>
        );
    };


    // ===================================================================================

    //---------------------------------Modal------------------------------------
    const { setModalContent, closeModal } = useModal();

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
            <div>
                <ChangeWatchListName
                    onClose={closeModal}
                    watchlist={watchlist}
                    user={user}
                />
            </div>
        )
    }


    //---------------------------------------------------------------------------


    return (
        <div className="main-container">
            <div className="row">
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
                                <p>SORT DROPDOWN</p>
                            </div>
                            <div className="watchlist-delete">
                                <button className="delete-watchlist-button" onClick={toggleWatchlistDeleteMenu}>...</button>

                                <div className={watchlistdeleteUlClassName} ref={ulRef}>
                                    <button type='submit' className="delete-watchlist-button" onClick={(e) => { e.stopPropagation(); handleDeleteWatchlist(currentWatchList); }}>Delete {currentWatchList.name}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="watchlist-stocks">
                        <div className="watchlist-stocks-headers-sort">
                            <div className="watchlist-sort-button-name">
                                <button className="sort-button">Name</button>
                            </div>
                            <div className="watchlist-sort-button">
                                <button className="sort-button">Symbol</button>
                            </div>
                            <div className="watchlist-sort-button">
                                <button className="sort-button">Price</button>
                            </div>
                            <div className="watchlist-sort-button">
                                <button className="sort-button">Today</button>
                            </div>
                            <div className="watchlist-sort-button">
                                <button className="sort-button">Market Cap</button>
                            </div>
                        </div>
                        <div className="watchlist-stocks-details">
                            {
                                currentWatchList.stocks.map((stock) => (
                                    <div className="stock" id={`stock${stock.id}`} key={`stock${stock.id}`}>
                                        <div className="stock-information">
                                            <div className="stock-name">
                                                <p>{stock.company_name}</p>
                                            </div>
                                            <div className="stock-symbol">
                                                <p className="stock-link">{stock.ticker_symbol}</p>
                                            </div>
                                            <div className="stock-symbol">
                                                <p className="stock-link">{stock.current_price}</p>
                                            </div>
                                            <div className="stock-hightoday">
                                                <p className="stock-link">HIGH TODAY %</p>
                                            </div>
                                            <div className="stock-marketcap">
                                                <p className="stock-link">{Math.round(stock.market_cap_billions / 1000000000) / 100}B</p>
                                            </div>
                                        </div>
                                        <div className="stock-delete">
                                            {/* DELETE USING ACTION */}
                                            <Form method="put" action={`/watchlist/${user.id}/${currentWatchList.id}`}>
                                                <button type="submit"
                                                    name='intent'
                                                    value='delete-stock'
                                                    className="stock-link">X</button>
                                                <input type='hidden' name="stock_id" value={stock.id} />
                                                <input type='hidden' name="watchlist_id" value={currentWatchList.id} />
                                            </Form>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
                <div className="sub-watchlist">
                    <header className="sublist-header">
                        <div className="sublist-title">
                            <h3>Lists</h3>
                        </div>
                        <div className="watchlist-add">
                            <p>+</p>
                        </div>
                    </header>
                    {
                        watchlist.map((list) => (
                            <div
                                className='row subwatchlist'
                                id={`watchlist${list.id}`}
                                key={`watchlist${list.id}`}

                            >
                                <div className="subwatchlist-description row" onClick={toWatchlist(list.id)}>
                                    <div className="watchlist-icon">
                                        <p>💰</p>
                                    </div>
                                    <div className="watchlist-name">
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
        </div>
    );
}




export default Watchlist
