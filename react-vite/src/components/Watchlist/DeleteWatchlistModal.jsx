import { Form } from "react-router-dom";


const ConfirmDeleteWatchlist = ({ onClose, watchlist, totalStocks }) => (
    < div className="modalbox" >
        <div className="row-delete-stuff">
            <button className="deleteClose" onClick={onClose}>✖</button>
            <h2>Are you sure you want to delete &quot;{watchlist.name}&quot;?</h2>
        </div>
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
