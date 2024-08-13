import { useLoaderData, useNavigate, useParams, Form } from "react-router-dom";
import { useSelector } from "react-redux";


import { useState, useEffect, useRef } from "react";

import './Watchlist.css'


const Watchlist = () => {

    // URL :user_id
    const { user_id, watchlist_num } = useParams()
    // Current session's user
    const user = useSelector((state) => state.session.user);

    // Validator - INVALID USER
    if (user_id != user.id) {
        window.alert("Invalid permission!")
        return (
            <h1>Invalid</h1>
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
    const navigate = useNavigate();

    function toWatchlist(listid) {
        return () => {
            return navigate(`/watchlist/${user.id}/${listid}`)
        }
    }



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
                                <p>DELETE ME</p>
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
                                                <button type="submit" className="stock-link">X</button>
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
                                onClick={toWatchlist(list.id)}
                            >
                                <div className="subwatchlist-description row">
                                    <div className="watchlist-icon">
                                        <p>💰</p>
                                    </div>
                                    <div className="watchlist-name">
                                        <p>{list.name}</p>
                                    </div>
                                </div>

                                <div className="subwatchlist-options">
                                    <p>...</p>
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
