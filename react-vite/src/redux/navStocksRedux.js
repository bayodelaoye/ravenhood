// import { useSelector } from "react-redux";


const GET_NAV_STOCKS = "stocks/GET_NAV_STOCKS";


const getNavStocks = (stocks) => ({

  type: GET_NAV_STOCKS,
  stocks,

});



export const navStocks = () => async (dispatch) => {

  // const navStocks = useSelector((store) => store.navStocks.navStocks);
  // console.log("navStocks from navStocksRedux = ", navStocks)

  // if (navStocks !== null){
  //   console.log("navStocks !== null");
  //   return navStocks
  // }

  const response = await fetch(`/api/stocks/`);

  if (response.ok) {
    const stocksObject = await response.json();
    const stocks = stocksObject.stocks;
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
      return { navStocks: action.stocks };
    default:
      return state;
  }
}

export default navStocksReducer;
