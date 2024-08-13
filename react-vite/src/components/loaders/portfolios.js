import configureStore from "../../redux/store";
import { thunkAuthenticate } from "../../redux/session";

const store = configureStore();

export const userPortfolios = async ({ params }) => {
  await store.dispatch(thunkAuthenticate()); // making sure the user session state is up to date and not using the previous state

  const state = store.getState(); // getting the updated state
  const currentUser = state.session.user;
  // console.log(currentUser);

  const userId = params?.id || currentUser?.id;

  if (!userId) {
    console.error("No user id available");
    return null;
  }

  const response = await fetch(`/api/users/${userId}/portfolios`);

  if (
    response.ok &&
    response.headers.get("content-type")?.includes("application/json")
  ) {
    const userPortfolios = await response.json();
    // console.log("HERE", userPortfolios);

    return userPortfolios.portfolios;
  } else {
    console.error(
      "Failed to fetch user portfolios or received non-JSON response"
    );
    return null;
  }
};
