export const deleteStock = async ({ request }) => {
    let formData = await request.formData();
    let data = Object.fromEntries(formData);
    // console.log("Data", data)

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


    return null
}
