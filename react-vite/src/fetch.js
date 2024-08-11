// Create a portfolio
fetch("api/portfolios", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    portfolio_name: "New portfolio",
    cash_balance: 100,
    total_amount: 200,
    is_active: true,
  }),
});

// Read all portfolios
fetch("api/portfolios/", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
});

// Read all portfolios by user_id
fetch("api/portfolios/1", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
});

// Update a portfolio by id
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

// Create a watch_list
fetch("api/watch_lists", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    name: "New watchlist",
  }),
});

// Read all watch_lists
fetch("api/watch_lists/", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
});

// Read all watch_lists by user_id
fetch("api/watch_lists/1", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
});
