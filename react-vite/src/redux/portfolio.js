const GET_PORTFOLIOS = "portfolios/GET_PORTFOLIOS";

const getUserPortfolios = (portfolios) => ({
  type: GET_PORTFOLIOS,
  portfolios,
});

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

const initialState = { portfolios: null };

function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIOS:
      return { userPortfolios: action.portfolios };
    default:
      return state;
  }
}

export default portfolioReducer;