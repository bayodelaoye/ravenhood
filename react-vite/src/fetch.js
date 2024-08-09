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

// Update a portfolio
fetch("api/portfolios/1", {
  method: "PUT",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    add: [5, 6, 7, 8],
    remove: [],
    name: "Update Name",
    cash: 0,
  }),
});

// Delete a portfolio by id
fetch("api/portfolios/2", {
  method: "DELETE",
  headers: {
    "content-type": "application/json",
  },
});
