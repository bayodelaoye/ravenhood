export const stockDetailsLoader = async ({ params }) => {
  const response = await fetch(`/api/stocks/${params.stockId}`);

  if (response.ok) {
    const stockDetails = await response.json();
    return stockDetails;
  }
};
