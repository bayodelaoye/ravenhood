export const userPortfolioLoader = async ({ params }) => {
  const response = await fetch(`/api/portfolios/${params.userId}`);

  if (response.ok) {
    const userPortfolios = await response.json();
    return userPortfolios;
  }
};
