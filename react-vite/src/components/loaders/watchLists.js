export const watchlistLoader = async () => {
    const response = await fetch(`/api/watch_lists/`)
    if (response.ok) {
        const userWatchlists = await response.json();
        // Fixed this
        return { userWatchlists };
    }
    return { userWatchlists: '' }

};
