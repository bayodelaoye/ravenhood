export const listStocksLoader = async () => {
  const response = await fetch(`/api/stocks/`);

  if (response.ok) {
    const stockDetails = await response.json();
    return stockDetails;
  }
};
