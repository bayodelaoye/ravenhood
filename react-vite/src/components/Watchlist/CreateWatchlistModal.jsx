import { Form } from "react-router-dom";
import { useState } from "react";

const CreateWatchList = ({ onClose, user, current }) => {

    const [watchlistName, setWatchlistName] = useState("")

    return (
        < div className="modalbox" >
            <button className="deleteClose" onClick={onClose}>X</button>
            <h2>Create List</h2>
            <Form method="post" action={`/watchlist/${user.id}/${current}`} onSubmit={onClose}>
                <input type='text' name="watchlistname" value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)} />
                <button
                    type="submit"
                    name='intent'
                    value='create-watchlist'
                    className="watchlist-create-button">Create List</button>
                <button className="deleteClose" onClick={onClose}>Cancel</button>
            </Form>

        </div >
    );
}

export default CreateWatchList;
