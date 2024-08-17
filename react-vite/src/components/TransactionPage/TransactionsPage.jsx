import "./TransactionsPage.css";
import { useDispatch, useSelector } from "react-redux";
import TransactionsIndex from "./TransactionsIndex";
import { useEffect, useState } from "react";
import { userTransactions } from "../../redux/transactions";

function TransactionsPage() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const allUserTransactions = useSelector((state) =>
    Object.values(state.transactions.transactions)
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      await dispatch(userTransactions(currentUser.id));
    };

    getTransactions().then(async () => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <div className="transactions-container">
          <div className="transactions-name-links">
            <h3>
              {currentUser.first_name} {currentUser.last_name} Transactions
            </h3>
            <div className="transactions-links-container">
              <p className="transactions-links">Investing</p>
              <p className="transactions-links"> Transfers</p>
              <p className="transactions-links">Recuring</p>
              <p className="transactions-links">Reports and statements</p>
              <p className="transactions-links">Tax center</p>
              <p className="transactions-links">History</p>
              <p className="transactions-links">Settings</p>
              <p className="transactions-links">Help</p>
            </div>
          </div>
          <div className="transaction-index-container">
            {allUserTransactions
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((transaction, index) => {
                return (
                  <TransactionsIndex transaction={transaction} id={index} />
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
