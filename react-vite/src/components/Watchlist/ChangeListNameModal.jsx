import { Form } from "react-router-dom";
import { useState } from "react";

const ChangeWatchListName = ({ onClose, watchlist }) => {

    const [watchlistName, setWatchlistName] = useState(watchlist.name)

    return (
        < div className="modalbox bigger" >
            <div className="row-delete-stuff spread-out">
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Edit List</h2>
            </div>
            <Form method="put" action={`/watchlist/${watchlist.id - 1}`} onSubmit={onClose} className="input-style">
                <input required type='text' name="watchlistname" value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)} className="name-change-input" />
                <input type='hidden' name="watchlist_id" value={watchlist.id} />
                <button
                    disabled={watchlistName === ''}
                    type="submit"
                    name='intent'
                    value='update-watchlist-name'
                    className="watchlist-update-button">Save</button>
            </Form>

        </div >
    );
}

export default ChangeWatchListName;
