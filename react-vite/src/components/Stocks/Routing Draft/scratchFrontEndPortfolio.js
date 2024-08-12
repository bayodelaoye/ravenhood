
export const getStockId = async (ticker) => {

  const response = await fetch("/api/stocks");
  const data = await response.json();
  const stocks = data.stocks.stocks;
  let stockId = stocks.find(stock => stock.ticker === ticker);
  return stockId

};

export const getTicker = async (stockId) => {

  const response = await fetch("/api/stocks");
  const data = await response.json();
  const stocks = data.stocks.stocks;
  let stockId = stocks.find(stock => stock.stockId === stockId);
  return ticker

};

export const getPortfolioStockTodaysPrice = async (stockId) => {

  const response = await fetch(`/api/stocks/${stockId}`);
  const stock = await response.json();
  const stockPrice = stock.price;

  return stockPrice

}

export const getPortfolioStockAllTransactions = async (stockId, portfolioId) => {}


export const getPortoflioStockAllBuys = async (stockId, portfolioId) => {

  const response = await fetch(`/api/transactions/${stockId}`);
  const data = await response.json();
  const transactions = data.transactions;
  const portfolioTransactions = transactions.filter(transaction => transaction.portfolioId === portfolio_id)

  return portfolioTransactions
}


export const getPortfolioStockAllSells = async (stockId, portfolioId) => {

  const response = await fetch(`/api/transactions/${stockId}`);
  const data = await response.json();
  const transactions = data.transactions;
  const portfolioTransactions = transactions.filter(transaction => transaction.portfolioId === portfolioId)
  const sells = portfolioTransactions.filter(transaction => transaction.type === "SELL")

  return sells
}


export const getPortfolioStockQuantity = async (transactions = getPortfolioStockAllTransactions(stockId, portfolioId)) => {

  const quantity = transactions.reduce((acc, curVal) => {return acc + curVal}, 0)
  return quantity

}


export const calculatePortfolioStockValue = async (getPortfolioStockQuantity, getPortfolioStockTodaysPrice) => {


}


export const getPortfolioName = async (portfolio_id) => {


}


export const getPortfolioCashBalance = async (portfolio_id) => {


}
