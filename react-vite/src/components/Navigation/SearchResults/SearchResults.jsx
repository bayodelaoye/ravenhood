// import { useSelector } from "react-redux";
// import Stock from "../../Stock";
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./SearchResults.css";
import { useEffect, useState } from "react";
import ListStocksIndex from "../../ListStocks/ListStocksIndex";
import Pagination from "../../ListStocks/Pagination";
import { useSelector } from "react-redux";

const SearchResults = () => {
  // const searchResults = useSelector(state => state.search.results);
  // console.log("searchReasults=========", searchResults)
  const currentUser = useSelector((state) => state.session.user);
  const listOfStocks = useLoaderData();
  const location = useLocation();
  const { state } = location;
  const [stocksState, setStocksState] = useState(state);
  const ticker_symbols = [];
  const stocksList = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage, setStocksPerPage] = useState(20);
  const lastPostIndex = currentPage * stocksPerPage;
  const firstPostIndex = lastPostIndex - stocksPerPage;
  const navigate = useNavigate();

  // added redirect
  useEffect(() => {
    if (!currentUser) return navigate("/");
    // setStocksState(state);
  }, [stocksState]);

  for (let i = 0; i < stocksState?.suggestions?.length; i++) {
    ticker_symbols.push(stocksState.suggestions[i].split(" ")[0]);
  }

  for (let j = 0; j < listOfStocks.stocks.length; j++) {
    if (ticker_symbols.includes(listOfStocks.stocks[j].ticker_symbol)) {
      stocksList.push(listOfStocks.stocks[j]);
    }
  }

  const currentPost = stocksList.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!currentUser) return;
  return (
    <div className="stock-list-page-container">
      <h1 id="SearchResultsH1">Search Results</h1>
      {/* <main id="SearchResultsMain">
        <h1 id="SearchResultsH1">Search Results</h1>
        <div id="SearchResults"></div>
      </main> */}
      <div className="stock-list-container">
        {console.log(currentPost)}
        {currentPost.map((stock, index) => {
          return (
            <ListStocksIndex
              stock={stock}
              key={index}
              totalPages={stocksList.length}
              stocksPerPage={stocksPerPage}
            />
          );
        })}
        <Pagination
          stocksPerPage={stocksPerPage}
          totalPages={stocksList.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default SearchResults;
