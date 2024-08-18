const GET_WATCHLISTS = "watchlist/GET_WATCHLISTS";

const getUserWatchLists = (watchLists) => {
  return {
    type: GET_WATCHLISTS,
    payload: watchLists
  }
};

export const userWatchLists = () => async (dispatch) => {
  const response = await fetch(`/api/watch_lists/`);

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getUserWatchLists(data));

    return data;
  }
};

const initialState = {};

function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WATCHLISTS:
      console.log("STATE WATCHLISTS REDUCER", state)
      return { userWatchLists: action.payload };
    default:
      console.log("STATE WATCHLISTS REDUCER", state)
      return state;
  }
}

export default watchlistReducer;
