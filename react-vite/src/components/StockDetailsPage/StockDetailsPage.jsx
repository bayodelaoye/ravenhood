import { useLoaderData } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import "./StockDetailsPage.css";
import { useState } from "react";

function StockDetailsPage() {
  const stockDetails = useLoaderData();
  const [shares, setShares] = useState(0);

  return (
    <>
      <div className="stock-details-container">
        <div className="stock-info-container">
          <p>Test</p>
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
                Ravenhood Financial's fee schedule to learn more.
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
