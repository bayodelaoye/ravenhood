import { Form } from "react-router-dom";
import { useState } from "react";


const CreateWatchList = ({ onClose, current }) => {

    const [watchlistName, setWatchlistName] = useState("")

    return (
        < div className="modalbox" >
            <div className="row-delete-stuff spread-out">
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Create List</h2>
            </div>
            <Form method="post" action={`/watchlist/${current}`} onSubmit={onClose} className="input-style">
                <input required type='text' className="name-change-input" name="watchlistname" value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)} />
                <button
                    disabled={watchlistName === ''}
                    type="submit"
                    name='intent'
                    value='create-watchlist'
                    className="watchlist-update-button">Create List</button>
                {/* <button className="deleteClose" onClick={onClose}>Cancel</button> */}
            </Form>

        </div >
    );
}

export default CreateWatchList;
