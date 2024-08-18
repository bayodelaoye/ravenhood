import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import "./ListStocks.css";
import ListStocksIndex from "./ListStocksIndex";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

function ListStocks() {
  const listOfStocks = useLoaderData();
  const currentUser = useSelector((state) => state.session.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage, setStocksPerPage] = useState(30);
  const lastPostIndex = currentPage * stocksPerPage;
  const firstPostIndex = lastPostIndex - stocksPerPage;
  const currentPost = listOfStocks.stocks.slice(firstPostIndex, lastPostIndex);
  const navigate = useNavigate();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (!currentUser) return navigate("/");
  }, []);

  return (
    <div className="stock-list-page-container">
      <h1>List of all stocks</h1>

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
