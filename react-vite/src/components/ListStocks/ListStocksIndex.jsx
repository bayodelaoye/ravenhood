import { Link } from "react-router-dom";

function ListStocksIndex({ stock, totalPages, stocksPerPage }) {
  return (
    <>
      <div className="stock-list-index-container">
        <div className="list-col">
          <p>Symbol</p>
          <Link to={`/stocks/${stock.id}`} className="link-to-stock">
            {stock.ticker_symbol}
          </Link>
        </div>

        <div className="list-col-name">
          <p>Name</p>
          <Link to={`/stocks/${stock.id}`} className="link-to-stock">
            {stock.company_name ? stock.company_name : "Unavailable"}
          </Link>
        </div>
        <div className="list-col">
          <p>Price</p>
          <Link to={`/stocks/${stock.id}`} className="link-to-stock">
            {stock.current_price ? stock.current_price : "Unavailable"}
          </Link>
        </div>
        <div className="list-col">
          <p>Volume</p>
          <Link to={`/stocks/${stock.id}`} className="link-to-stock">
            {stock.volume ? stock.volume : "Unavailable"}
          </Link>
        </div>
        <div className="list-col">
          <p>Market cap</p>
          <Link to={`/stocks/${stock.id}`} className="link-to-stock">
            {stock.market_cap_billions
              ? stock.market_cap_billions
              : "Unavailable"}
          </Link>
        </div>
        <div className="list-col">
          <p>P/E</p>
          <Link to={`/stocks/${stock.id}`} className="link-to-stock">
            {stock.price_earnings_ratio
              ? stock.price_earnings_ratio
              : "Unavailable"}
          </Link>
        </div>
        <div className="list-col">
          <p>Div yield</p>
          <Link to={`/stocks/${stock.id}`} className="link-to-stock">
            {stock.dividend_yield ? stock.dividend_yield : "Unavailable"}
          </Link>
        </div>
      </div>
      <div className="list-stocks-border"></div>
    </>
  );
}

export default ListStocksIndex;
