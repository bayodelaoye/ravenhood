import {
  useLoaderData,
  Form,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import "./StockDetailsPage.css";
import { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import { useSelector, useDispatch } from "react-redux";
import { userPortfolios } from "../../redux/portfolio";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";
import CreateWatchList from "../Watchlist/CreateWatchlistModal";
import AddStockToWatchListModal from "../Watchlist/AddStockToWatchListModal";
import NuHomePage from "../HomePage/Nu-HomePage";

function StockDetailsPage() {
  const dispatch = useDispatch();
  const stockDetails = useLoaderData();
  const [transactionType, setTransactionType] = useState("");
  let [portfolioType, setPortfolioType] = useState("");
  const [shares, setShares] = useState(0);
  const [timeLineBtn, setTimeLineBtn] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userWatchLists, setUserWatchLists] = useState("");
  const [watchListsWithoutStock, setWatchListsWithoutStock] = useState([]);
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);
  const listOfUserPortfolios = useSelector(
    (state) => state.portfolios?.userPortfolios?.portfolios
  );
  const location = useLocation();
  const { state } = location; // get the state

  useEffect(() => {
    if (!currentUser) return navigate("/");
    const fetchPortfolioData = async () => {
      await dispatch(userPortfolios(currentUser?.id));
    };

    const fetchWatchListArray = async () => {
      const response = await fetch(`/api/watch_lists/`);
      if (response.ok) {
        const watchList = await response.json();
        setUserWatchLists(watchList);
      }
    };

    const loadData = async () => {
      await Promise.all([fetchPortfolioData(), fetchWatchListArray()]);
      setIsLoaded(true);
    };

    loadData();
  }, [dispatch, currentUser?.id]);

  useEffect(() => {
    if (userWatchLists?.watch_lists) {
      // Filter watch lists where the stock is not present
      const filteredWatchLists = userWatchLists.watch_lists.filter(
        (watchList) => {
          // Check if the stock is not in this watch list
          return !watchList.stocks.some(
            (stock) => stock.id === stockDetails.id
          );
        }
      );

      // Update the state with the filtered list
      setWatchListsWithoutStock(filteredWatchLists);
    }
  }, [userWatchLists]);

  useEffect(() => {
    if (timeLineBtn === "") {
    } else {
      const className = timeLineBtn.split(" ")[1];
      const element = document.querySelector("." + className);
      const timeLines = document.getElementsByClassName("time-line-btn");

      for (let i = 0; i < timeLines.length; i++) {
        if (timeLines[i].classList.contains("active")) {
          timeLines[i].classList.remove("active");
        }
      }

      element.classList.add("active");
    }
    const errors = {};

    if (transactionType === "")
      errors.transaction = "Must select a Buy or Sell";

    if (portfolioType === "") errors.portfolio = "Must select a portfolio";

    if (
      isNaN(Number(shares)) ||
      shares === 0 ||
      shares === "0" ||
      !Number.isInteger(shares)
    )
      errors.shares = "Must input valid integer number of shares";

    setFormErrors(errors);
  }, [timeLineBtn, transactionType, shares, portfolioType]);

  const submitTransaction = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (Object.values(formErrors).length === 0) {
      const response = await fetch(`/api/transactions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portfolio_id: portfolioType,
          type: transactionType,
          quantity: shares,
          ticker: stockDetails.ticker_symbol,
        }),
      });

      const message = await response.json();
      if (response.ok) {
        navigate(`/users/${currentUser.id}/transactions`);
      }

      setFormErrors({
        "fetch-error": message["message"],
      });
    }
  };

  const handleWatchlistUpdate = async () => {
    const response = await fetch(`/api/watch_lists/`);
    if (response.ok) {
      const watchList = await response.json();
      setUserWatchLists(watchList);
    }
  };

  if (!currentUser) return <NuHomePage />;

  return (
    <>
      {isLoaded ? (
        <div className="stock-details-container">
          <div className="stock-info-container">
            <div className="company-name-price">
              <h3>{stockDetails.company_name}</h3>
              <p>${stockDetails.current_price}</p>
            </div>
            <LineGraph
              stock={stockDetails}
              timeline={timeLineBtn}
              state={state}
            />
            <div className="time-line">
              <div
                className="time-line-btn one-day"
                value="one-day"
                onClick={(e) => setTimeLineBtn(e.target.className)}
              >
                1D
              </div>
              <div
                className="time-line-btn one-week"
                onClick={(e) => setTimeLineBtn(e.target.className)}
              >
                1W
              </div>
              <div
                className="time-line-btn one-month"
                onClick={(e) => setTimeLineBtn(e.target.className)}
              >
                1M
              </div>
              <div
                className="time-line-btn three-month active"
                onClick={(e) => setTimeLineBtn(e.target.className)}
              >
                3M
              </div>
              <div
                className="time-line-btn ytd"
                onClick={(e) => setTimeLineBtn(e.target.className)}
              >
                YTD
              </div>
              <div
                className="time-line-btn one-year"
                onClick={(e) => setTimeLineBtn(e.target.className)}
              >
                1Y
              </div>
              <div
                className="time-line-btn five-year"
                onClick={(e) => setTimeLineBtn(e.target.className)}
              >
                5Y
              </div>
              <div
                className="time-line-btn all"
                onClick={(e) => setTimeLineBtn(e.target.className)}
              >
                ALL
              </div>
            </div>
            <div className="stock-details">
              <div className="about-company about-info-bold">
                About {stockDetails.ticker_symbol}
              </div>
              <div className="company-description">
                <p>
                  {stockDetails.description
                    ? stockDetails.description
                    : "Unavailable"}
                </p>
              </div>
              <div className="company-info-container">
                <div className="info-text">
                  <p className="about-info-bold">CEO</p>
                  <p>{stockDetails.ceo ? stockDetails.ceo : "Unavailable"}</p>
                </div>
                <div className="info-text">
                  <p className="about-info-bold">Employees</p>
                  <p>
                    {stockDetails.employees
                      ? stockDetails.employees
                      : "Unavailable"}
                  </p>
                </div>
                <div className="info-text">
                  <p className="about-info-bold">Headquarters</p>
                  <p>
                    {stockDetails.headquarters
                      ? stockDetails.headquarters
                      : "Unavailable"}
                  </p>
                </div>
                <div className="info-text">
                  <p className="about-info-bold">Founded</p>
                  <p>
                    {stockDetails.founded
                      ? stockDetails.founded
                      : "Unavailable"}
                  </p>
                </div>
              </div>
            </div>

            <div className="stock-details">
              <div className="about-company about-info-bold">
                {stockDetails.ticker_symbol} Key Statistics
              </div>

              <div className="company-info-container">
                <div className="company-info-col">
                  <div className="info-text">
                    <p className="about-info-bold">Market cap</p>
                    <p>
                      {stockDetails.market_cap_billions
                        ? stockDetails.market_cap_billions
                        : "Unavailable"}
                    </p>
                  </div>
                  <div className="info-text">
                    <p className="about-info-bold">High today</p>
                    <p>
                      {stockDetails.high_today
                        ? stockDetails.high_today
                        : "Unavailable"}
                    </p>
                  </div>
                  <div className="info-text">
                    <p className="about-info-bold">52 Week high</p>
                    <p>
                      {stockDetails.fifty_two_week_high
                        ? stockDetails.fifty_two_week_high
                        : "Unavailable"}
                    </p>
                  </div>
                </div>
                <div className="company-info-col">
                  <div className="info-text">
                    <p className="about-info-bold">Price-Earnings ratio</p>
                    <p>
                      {stockDetails.price_earnings_ratio
                        ? stockDetails.price_earnings_ratio
                        : "Unavailable"}
                    </p>
                  </div>
                  <div className="info-text">
                    <p className="about-info-bold">Low today</p>
                    <p>
                      {stockDetails.low_today
                        ? stockDetails.low_today
                        : "Unavailable"}
                    </p>
                  </div>
                  <div className="info-text">
                    <p className="about-info-bold">52 Week low</p>
                    <p>
                      {stockDetails.fifty_two_week_low
                        ? stockDetails.fifty_two_week_low
                        : "Unavailable"}
                    </p>
                  </div>
                </div>
                <div className="company-info-col">
                  <div className="info-text">
                    <p className="about-info-bold">Dividend yield</p>
                    <p>
                      {stockDetails.dividend_yield
                        ? stockDetails.dividend_yield
                        : "Unavailable"}
                    </p>
                  </div>
                  <div className="info-text">
                    <p className="about-info-bold">Open price</p>
                    <p>
                      {stockDetails.open_price
                        ? stockDetails.open_price
                        : "Unavailable"}
                    </p>
                  </div>
                </div>
                <div className="company-info-col">
                  <div className="info-text">
                    <p className="about-info-bold">Average volume</p>
                    <p>
                      {stockDetails.average_volume
                        ? stockDetails.average_volume
                        : "Unavailable"}
                    </p>
                  </div>
                  <div className="info-text">
                    <p className="about-info-bold">Volume</p>
                    <p>
                      {stockDetails.volume
                        ? stockDetails.volume
                        : "Unavailable"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {currentUser ? (
            <div className="buy-sell-watch-container">
              <div className="buy-container">
                <div className="buy-stock-name">
                  <p>Buy/Sell - {stockDetails.ticker_symbol}</p>
                  <IoIosArrowDown className="down-caret" />
                </div>
                <Form
                  className="buy-sell"
                  method="post"
                  onSubmit={submitTransaction}
                >
                  <div className="dropdown-container">
                    <select
                      name="transaction-type"
                      onChange={(e) => setTransactionType(e.target.value)}
                      className="select-buy-sell"
                    >
                      <option value="" selected disabled hidden>
                        Select Buy or Sell
                      </option>
                      <option value="BUY">Buy</option>
                      <option value="SELL">Sell</option>
                    </select>
                    <select
                      name="portfolio-type"
                      onClick={(e) => setPortfolioType(e.target.value)}
                      className="select-buy-sell"
                    >
                      <option value="" selected disabled hidden>
                        Select Portfolio
                      </option>
                      {listOfUserPortfolios?.map((portfolio, id) => {
                        return (
                          <option value={portfolio?.id} key={id}>
                            {portfolio?.portfolio_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="order">
                    <div className="shares-amount">
                      <p>Shares</p>
                      <input
                        className="shares-input"
                        type="text"
                        name="shares"
                        placeholder={shares}
                        onChange={(e) => setShares(Number(e.target.value))}
                      />
                    </div>
                    <div className="market-price">
                      <p>Market Price</p>
                      <p className="bold-text">{stockDetails.current_price}</p>
                    </div>
                  </div>
                  <div className="line-break"></div>
                  <div className="estimated-cost errors-marging">
                    <p>Amount</p>
                    <p>
                      $
                      {(
                        Number(stockDetails.current_price) * Number(shares)
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="form-errors">
                    {isSubmitted ? (
                      Object.values(formErrors).length >= 1 ? (
                        <p>{formErrors.transaction}</p>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {isSubmitted ? (
                      Object.values(formErrors).length >= 1 ? (
                        <p>{formErrors.portfolio}</p>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {isSubmitted ? (
                      Object.values(formErrors).length >= 1 ? (
                        <p>{formErrors.shares}</p>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {isSubmitted ? (
                      Object.values(formErrors).length >= 1 ? (
                        <p>{formErrors["fetch-error"]}</p>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="transaction">
                    <button
                      type="submit"
                      className="sign-up-buy-btn transaction-btn"
                    >
                      Complete Transaction
                    </button>
                  </div>
                </Form>
              </div>
              {userWatchLists?.watch_lists?.length === 0 ? (
                <OpenModalButton
                  buttonText={`Watch ${stockDetails.ticker_symbol}`}
                  className="watch-list-btn"
                  onClose={closeModal}
                  modalComponent={
                    <CreateWatchList current="" onClose={closeModal} />
                  }
                />
              ) : (
                <>
                  {watchListsWithoutStock.length === 0 ? (
                    <></>
                  ) : (
                    <OpenModalButton
                      buttonText={`Watch ${stockDetails.ticker_symbol}`}
                      onClose={closeModal}
                      className="watch-list-btn"
                      modalComponent={
                        <AddStockToWatchListModal
                          onClose={() => {
                            closeModal();
                            handleWatchlistUpdate();
                          }}
                          stockId={stockDetails.id}
                          stockNotInwatchLists={watchListsWithoutStock}
                        />
                      }
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="buy-sell-watch-container">
              <div className="buy-container">
                <div className="buy-stock-name">
                  <p>Buy {stockDetails.ticker_symbol}</p>
                  <IoIosArrowDown className="down-caret" />
                </div>
                <div className="order">
                  <div className="shares-amount">
                    <p>Shares</p>
                    <input
                      className="shares-input"
                      type="text"
                      placeholder={shares}
                      onChange={(e) => setShares(e.target.value)}
                    />
                  </div>
                  <div className="market-price">
                    <p>Market Price</p>
                    <p className="bold-text">{stockDetails.current_price}</p>
                  </div>
                  <div className="commissions">
                    <p>Commissions</p>
                    <p>$0.00</p>
                  </div>
                </div>
                <div className="line-break"></div>
                <div className="estimated-cost">
                  <p>Estimated Cost</p>
                  <p>
                    $
                    {(
                      Number(stockDetails.current_price) * Number(shares)
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="how-to-buy">
                  <p className="bold-text">
                    How to buy {stockDetails.company_name}?
                  </p>
                  <p>
                    Sign up for a Ravenhood brokerage account to buy or sell{" "}
                    {stockDetails.company_name}
                    stock and options commission-free. Other fees may apply. See
                    Ravenhood Financial&apos;s fee schedule to learn more.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/signup")}
                  className="sign-up-buy-btn"
                >
                  Sign Up to Buy
                </button>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="watch-list-btn"
              >
                Watch {stockDetails.ticker_symbol}
              </button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default StockDetailsPage;
