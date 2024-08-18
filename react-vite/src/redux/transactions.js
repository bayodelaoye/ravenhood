const GET_TRANSACTIONS = "transactions/GET_TRANSACTIONS";

const getUserTransactions = (transactions) => {
  return {
    type: GET_TRANSACTIONS,
    payload: transactions,
  }
};

export const userTransactions = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/transactions`);

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getUserTransactions(data));

    return data;
  }
};

const initialState = {};

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      console.log("STATE TRANSACTIONS REDUCER", state, "ACTION.TYPE = ", action.type, "ACTION.PAYLOAD = ", action.payload)
      return { ...state, transactions: action.payload };
    default:
      console.log("STATE TRANSACTIONS REDUCER", state)
      return state;
  }
}

export default transactionReducer;
