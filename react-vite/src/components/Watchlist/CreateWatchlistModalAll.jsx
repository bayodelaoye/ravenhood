import { Form } from "react-router-dom";
import { useState } from "react";


const CreateWatchList = ({ onClose }) => {

    const [watchlistName, setWatchlistName] = useState("")

    return (
        < div className="modalbox" >
            <div className="row-delete-stuff spread-out">
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Create List</h2>
            </div>
            <Form method="post" action={`/watchlist`} onSubmit={onClose} className="input-style">
                <h3>Watchlist Name:</h3>
                <input required type='text' className="name-change-input" name="watchlistname" value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)} />
                {
                    watchlistName.length > 30 ? <p className="error">Watchlist cannot exceed 30 characters</p> : ""
                }
                <button
                    type="submit"
                    disabled={watchlistName === '' || watchlistName.length > 30}
                    name='intent'
                    value='create-watchlist'
                    className="watchlist-update-button">Create List</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default CreateWatchList;
