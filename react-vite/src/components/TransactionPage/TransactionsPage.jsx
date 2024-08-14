import { useLoaderData } from "react-router-dom";
import "./TransactionsPage.css";
import TransactionsIndex from "./TransactionsIndex";

function TransactionsPage() {
  const userTransactions = useLoaderData();

  return (
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
        {userTransactions.map((transaction, index) => {
          return <TransactionsIndex transaction={transaction} id={index} />;
        })}
      </div>
    </div>
  );
}

export default TransactionsPage;
