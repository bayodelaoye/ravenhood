const GET_STOCKS = "stocks/GET_STOCKS";

const getStocks = (stocks) => ({
  type: GET_STOCKS,
  stocks,
});

export const allStocks = () => async (dispatch) => {
  const response = await fetch(`/api/stocks/`);

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getStocks(data));

    return data;
  }
};

const initialState = { stocks: null };

function stockReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCKS:
      return { ...state, allStocks: action.stocks };
    default:
      return state;
  }
}

export default stockReducer;
