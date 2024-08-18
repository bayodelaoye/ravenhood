const GET_PORTFOLIOS = "portfolios/GET_PORTFOLIOS";

const getUserPortfolios = (portfolios) => {
  return {
    type: GET_PORTFOLIOS,
    portfolios,
  }
};

export const userPortfolios = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/portfolios`);

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getUserPortfolios(data));

    return data;
  }
};

const initialState = {};

function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIOS:
      console.log("STATE PORTFOLIO REDUCER", state)
      return { ...state, userPortfolios: action.portfolios };
    default:
      console.log("STATE PORTFOLIO REDUCER", state)
      return state;
  }
}

export default portfolioReducer;
