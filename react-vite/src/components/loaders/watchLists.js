export const watchlistLoader = async ({ params }) => {
    const response = await fetch(`/api/watch_lists/`)
    if (response.ok) {
        const userWatchlists = await response.json();
        return userWatchlists.watch_lists;
    }
    return null

};
