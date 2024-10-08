import "./TransactionsPage.css";
import { useDispatch, useSelector } from "react-redux";
import TransactionsIndex from "./TransactionsIndex";
import { useEffect, useState } from "react";
import { userTransactions } from "../../redux/transactions";
import { useNavigate } from "react-router-dom";
import NuHomePage from "../HomePage/Nu-HomePage";
import { allStocks } from "../../redux/stock";

function TransactionsPage() {
  const currentUser = useSelector((state) => state.session.user);
  const stocks = useSelector((state) => state.stocks?.allStocks?.stocks);
  const dispatch = useDispatch();
  const allUserTransactions = useSelector((state) => {
    const transactions = state?.transactions?.transactions || {};
    return Object.values(transactions);
  });
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!currentUser) return navigate("/");
    const getTransactions = async () => {
      await dispatch(userTransactions(currentUser.id));
      await dispatch(allStocks());
    };

    getTransactions().then(async () => setIsLoaded(true));
  }, [dispatch]);

  const sortedTransactions = allUserTransactions.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  if (!currentUser) return <NuHomePage />;

  return (
    <>
      {isLoaded ? (
        <div className="transactions-container">
          <div className="transactions-name-links">
            <h3>
              {currentUser?.first_name} {currentUser?.last_name} Transactions
            </h3>
            {/* <div className="transactions-links-container">
              <p className="transactions-links">Investing</p>
              <p className="transactions-links"> Transfers</p>
              <p className="transactions-links">Recuring</p>
              <p className="transactions-links">Reports and statements</p>
              <p className="transactions-links">Tax center</p>
              <p className="transactions-links">History</p>
              <p className="transactions-links">Settings</p>
              <p className="transactions-links">Help</p>
            </div> */}
          </div>
          <div className="transaction-index-container">
            {sortedTransactions?.map((transaction, index) => {
              return (
                <TransactionsIndex
                  transaction={transaction}
                  stocks={stocks}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TransactionsPage;
