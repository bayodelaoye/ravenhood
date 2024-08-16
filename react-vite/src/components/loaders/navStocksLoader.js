export const navStocksLoader = async () => {

  const response = await fetch(`/api/stocks/`);

  if (response.ok) {
    const stocksObject = await response.json();
    const stocks = stocksObject.stocks;
    // console.log("navStocksLoader ran stocks = ", stocks)
    return stocks
  }
};
