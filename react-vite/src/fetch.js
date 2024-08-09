// Create a portfolio
fetch("api/portfolios/", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    user_id: 2,
    portfolio_name: "Test",
    cash_balance: 100,
    total_amount: 200,
    is_active: true,
  }),
});

// Read portfolio by user_id
fetch("api/portfolios/1", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
});
