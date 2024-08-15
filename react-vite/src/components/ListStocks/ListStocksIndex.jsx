import { useLoaderData } from "react-router-dom";

function ListStocksIndex({ stock, totalPages, stocksPerPage }) {
  return (
    <>
      <div className="stock-list-index-container">
        <div className="list-col">
          <p>Symbol</p>
          <p>{stock.ticker_symbol}</p>
        </div>

        <div className="list-col-name">
          <p>Name</p>
          <p>{stock.company_name}</p>
        </div>
        <div className="list-col">
          <p>Price</p>
          <p>{stock.current_price}</p>
        </div>
        <div className="list-col">
          <p>Volume</p>
          <p>{stock.volume}</p>
        </div>
        <div className="list-col">
          <p>Market cap</p>
          <p>{stock.market_cap_billions}</p>
        </div>
        <div className="list-col">
          <p>P/E</p>
          <p>{stock.price_earnings_ratio}</p>
        </div>
        <div className="list-col">
          <p>Div yield</p>
          <p>{stock.dividend_yield}</p>
        </div>
      </div>
      <div className="transaction-border"></div>
    </>
  );
}

export default ListStocksIndex;
