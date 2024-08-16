const GET_NAV_STOCKS = "stocks/GET_NAV_STOCKS";


const getNavStocks = (stocks) => ({

  type: GET_NAV_STOCKS,
  stocks,

});


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


const initialState = { navStocks: null };

function navStocksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NAV_STOCKS:
      // console.log("navStocksReducer ran")
      return { ...state, navStocks: action.stocks };
    default:
      return state;
  }
}

export default navStocksReducer;
