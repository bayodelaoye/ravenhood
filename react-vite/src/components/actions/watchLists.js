import { redirect } from "react-router-dom";

export const deleteWatchlist = async ({ request }) => {
    let formData = await request.formData();
    let data = Object.fromEntries(formData);
    // console.log("Data", data)
    let intent = formData.get('intent')
    // console.log('intent', intent)

    if (intent === 'delete-stock') {
        const response = await fetch(`/api/watch_lists/${data.watchlist_id}/remove`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stock_id: data.stock_id
            })
        })

        if (response.ok) {
            const message = await response.json();
            // console.log(message)
            return message;
        }
    }

    if (intent === 'delete-watchlist') {
        // console.log(data.watchlist_id)
        const response = await fetch(`/api/watch_lists/${data.watchlist_id}`, {
            method: "DELETE"
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return redirect('/watchlist')
        }
    }

    if (intent === 'update-watchlist-name') {
        // console.log(data)
        const response = await fetch(`/api/watch_lists/${data.watchlist_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.watchlistname
            })
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return message
        }
    }

    if (intent === 'create-watchlist') {
        console.log(data)
        const response = await fetch(`/api/watch_lists/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.watchlistname
            })
        })
        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return message
        }
    }




    return null
}
