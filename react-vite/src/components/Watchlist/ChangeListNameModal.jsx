import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useActionData } from "react-router-dom";

const ChangeWatchListName = ({ onClose, watchlist, currentlist }) => {
  const [watchlistName, setWatchlistName] = useState(watchlist.name);
  // const data = useActionData();
  // console.log(data);

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
    <div className="modalbox bigger-biggest">
      <div className="row-delete-stuff spread-out">
        <button className="deleteClose" onClick={onClose}>
          ✖
        </button>
        <h2>Edit List</h2>
      </div>
      <Form
        method="put"
        action={`/watchlist/${currentlist}`}
        onSubmit={onClose}
        className="input-style"
      >
        <h3>Watchlist Name:</h3>
        <input
          required
          type="text"
          name="watchlistname"
          value={watchlistName}
          onChange={(e) => setWatchlistName(e.target.value)}
          className="name-change-input"
        />
        <input type="hidden" name="watchlist_id" value={watchlist.id} />
        {watchlistName.length > 30 ? (
          <p className="error">Watchlist cannot exceed 30 characters</p>
        ) : (
          ""
        )}
        <button
          disabled={watchlistName === "" || watchlistName.length > 30}
          type="submit"
          name="intent"
          value="update-watchlist-name"
          className="watchlist-update-button"
        >
          Save
        </button>
      </Form>
    </div>
  );
};

export default ChangeWatchListName;
