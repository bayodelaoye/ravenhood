import { Form } from "react-router-dom";
import { useState } from "react";

const ChangeWatchListName = ({ onClose, watchlist, user }) => {

    const [watchlistName, setWatchlistName] = useState(watchlist.name)

    return (
        < div className="modalbox" >
            <button className="deleteClose" onClick={onClose}>X</button>
            <h2>Edit List</h2>
            <Form method="put" action={`/watchlist/${user.id}/${watchlist.id}`} onSubmit={onClose}>
                <input type='text' name="watchlistname" value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)} />
                <input type='hidden' name="watchlist_id" value={watchlist.id} />
                <button
                    type="submit"
                    name='intent'
                    value='update-watchlist-name'
                    className="watchlist-update-button">Save</button>
            </Form>

        </div >
    );
}

export default ChangeWatchListName;
