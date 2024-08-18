const GET_NAV_STOCKS = "stocks/GET_NAV_STOCKS";


const getNavStocks = (stocks) => {
  return {
    type: GET_NAV_STOCKS,
    payload: stocks,
  }
};


export const navStocks = () => async (dispatch) => {


  const response = await fetch(`/api/stocks/`);

  if (response.ok) {
    const stocksObject = await response.json();
    const stocks = await stocksObject.stocks;
    if (stocks.errors) {
      return;
    }

    dispatch(getNavStocks(stocks));

    // console.log("navStocks thunk ran stocks = ", stocks)
    return stocks;
  }
};


const initialState = {};

function navStocksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NAV_STOCKS:
      // console.log("navStocksReducer ran")
      console.log("STATE FROM NAVSTOCKS REDUCER", state)
      return { ...state, navStocks: action.payload };
    default:
      console.log("STATE FROM NAVSTOCKS REDUCER", state)
      return state;
  }
}

export default navStocksReducer;
