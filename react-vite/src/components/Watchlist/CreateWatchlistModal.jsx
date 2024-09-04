import { Form } from "react-router-dom";
import { useEffect, useState } from "react";


const CreateWatchList = ({ onClose, current }) => {

    const [watchlistName, setWatchlistName] = useState("");

    useEffect(() => {
        const handlePageChange = () => {
            // Perform actions when page changes
            onClose();
        };

        window.addEventListener('popstate', handlePageChange);

        return () => {
            window.removeEventListener('popstate', handlePageChange);
        };
    }, [onClose]);

    return (
        < div className="modalbox" >
            <div className="row-delete-stuff spread-out">
                <button className="deleteClose" onClick={onClose}>✖</button>
                <h2>Create Lists</h2>
            </div>

            <Form method="post" action={`/watchlist/${current}`} onSubmit={onClose} className="input-style">
                <h3>Watchlist Name:</h3>
                <input required type='text' className="name-change-input" name="watchlistname" value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)} />
                {
                    watchlistName.length > 30 ? <p className="error">Watchlist cannot exceed 30 characters</p> : ""
                }
                <button
                    disabled={watchlistName === '' || watchlistName.length > 30}
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
