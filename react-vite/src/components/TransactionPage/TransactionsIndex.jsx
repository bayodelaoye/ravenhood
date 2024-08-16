function TransactionsIndex({ transaction }) {
  return (
    <>
      <div className="transaction-card-container">
        <div className="transaction-text-column">
          <p className="transaction-title">
            {transaction.type} {transaction.stock}{" "}
          </p>
          <p>{transaction.created_at}</p>
        </div>

        <div className="transaction-shares-type">
          <p className="transaction-title">{transaction.quantity} Shares</p>
          <p>
            {transaction.type === "BUY" ? (
              <>+{transaction.type}</>
            ) : (
              <>-{transaction.type}</>
            )}
          </p>
        </div>
      </div>
      <div className="transaction-border"></div>
    </>
  );
}

export default TransactionsIndex;
