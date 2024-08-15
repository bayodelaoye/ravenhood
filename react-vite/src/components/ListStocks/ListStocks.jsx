import { useLoaderData } from "react-router-dom";
import "./ListStocks.css";
import ListStocksIndex from "./ListStocksIndex";
import { useState } from "react";
import Pagination from "./Pagination";

function ListStocks() {
  const listOfStocks = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage, setStocksPerPage] = useState(30);
  const lastPostIndex = currentPage * stocksPerPage;
  const firstPostIndex = lastPostIndex - stocksPerPage;
  const currentPost = listOfStocks.stocks.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="stock-list-page-container">
      <h1>List of stocks</h1>

      <div className="stock-list-container">
        {currentPost.map((stock, index) => {
          return (
            <ListStocksIndex
              stock={stock}
              key={index}
              totalPages={listOfStocks.stocks.length}
              stocksPerPage={stocksPerPage}
            />
          );
        })}
        <Pagination
          stocksPerPage={stocksPerPage}
          totalPages={listOfStocks.stocks.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default ListStocks;
