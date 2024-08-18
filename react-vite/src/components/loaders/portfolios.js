import configureStore from "../../redux/store";
import { thunkAuthenticate } from "../../redux/session";
import { json } from "react-router-dom";

const store = configureStore();
export const userPortfolios = async ({ params }) => {
	await store.dispatch(thunkAuthenticate()); // making sure the user session state is up to date and not using the previous state
	const theState = store.getState(); // getting the updated state
	const currentUser = theState.session.user;
	const userId = params?.id || currentUser?.id;

	if (!userId) {
		console.error("No user id available");
		return null;
	}

	// const response = await fetch(`/api/users/${userId}/portfolios`);
	// const response = await fetch(`/api/users/${userId}`);

	const urls = [`/api/users/${userId}`, `/api/watch_lists/`];
	const fetchPromises = urls.map((url) =>
		fetch(url).then((response) => response.json()),
	);

	const [userPortfolios, userWatchlists] = await Promise.all(fetchPromises);

	return json({ userPortfolios, userWatchlists });

	// if (
	// 	response.ok &&
	// 	response.headers.get("content-type")?.includes("application/json")
	// ) {
	//       const userPortfolios = await response.json();
	// 	return userPortfolios;
	// } else {
	// 	console.error(
	// 		"Failed to fetch user portfolios or received non-JSON response",
	// 	);
	// 	return null;
	// }
};
