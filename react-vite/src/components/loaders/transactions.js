export const userTransactionsLoader = async ({ params }) => {
  const response = await fetch(`/api/users/transactions`);

  console.log(response);
  if (response.ok) {
    const userTransactions = await response.json();
    return userTransactions;
  }
};
