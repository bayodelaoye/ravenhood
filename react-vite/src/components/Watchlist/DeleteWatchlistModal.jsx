import { Form } from "react-router-dom";


const ConfirmDeleteWatchlist = ({ onClose, watchlist, totalStocks, user }) => (
    < div className="modalbox" >
        <button className="deleteClose" onClick={onClose}>X</button>
        <h2>Are you sure you want to delete &quot;{watchlist.name}&quot;?</h2>
        <p>If you delete this list and its {totalStocks} items, it will be gone forever!</p>
        <Form method="delete" action={`/watchlist/${watchlist.id}`} onSubmit={onClose}>
            <button
                type="submit"
                name='intent'
                value='delete-watchlist'
                className="watchlist-delete-button">Delete {watchlist.name}</button>
            <input type='hidden' name="watchlist_id" value={watchlist.id} />
        </Form>

    </div >
);

export default ConfirmDeleteWatchlist;
