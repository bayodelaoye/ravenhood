import { useLoaderData } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import "./StockDetailsPage.css";
import { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import { useSelector, useDispatch } from "react-redux";

function StockDetailsPage() {
  const stockDetails = useLoaderData();
  const [shares, setShares] = useState(0);
  const [timeLineBtn, setTimeLineBtn] = useState("");
  const currentUser = useSelector((state) => state.session.user);

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
  }, [timeLineBtn]);

  return (
    <>
      <div className="stock-details-container">
        <div className="stock-info-container">
          <div className="company-name-price">
            <h3>{stockDetails.company_name}</h3>
            <p>${stockDetails.current_price}</p>
          </div>
          <LineGraph stock={stockDetails} />
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
                  {stockDetails.founded ? stockDetails.founded : "Unavailable"}
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
                    {stockDetails.volume ? stockDetails.volume : "Unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <p>${(stockDetails.current_price * shares).toFixed(2)}</p>
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
            <button className="sign-up-buy-btn">Sign Up to Buy</button>
          </div>
          <button className="watch-list-btn">
            Watch {stockDetails.ticker_symbol}
          </button>
        </div>
      </div>
    </>
  );
}

export default StockDetailsPage;
