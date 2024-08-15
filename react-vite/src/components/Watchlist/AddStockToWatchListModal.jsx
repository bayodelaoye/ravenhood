import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userWatchLists } from "../../redux/watchlist";
import "./Watchlist.css";

const AddStockToWatchListModal = ({ onClose }) => {
  const [watchlistName, setWatchlistName] = useState("");
  const listOfUserWatchList = useSelector(
    (state) => state?.watchlist?.userWatchLists?.watch_lists
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userWatchLists())
      .then(() => setIsLoaded(true))
      .then(() => {
        const errors = {};

        if (watchlistName === "") errors.watchlist = "Must select a watch list";

        setFormErrors(errors);
      });
  }, [dispatch, watchlistName]);

  const submitAddToWatchList = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
  };

  return (
    <>
      {isLoaded ? (
        <div className="watch-list-modal-container">
          <h2>Add Stock</h2>
          <div>
            {isSubmitted ? (
              Object.values(formErrors).length >= 1 ? (
                <p className="watchlist-form-errors">{formErrors.watchlist}</p>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
          <div className="watchlist-form-container">
            <Form method="post" onSubmit={submitAddToWatchList}>
              <select
                name=""
                onClick={(e) => setWatchlistName(e.target.value)}
                className="select-watchlist"
              >
                <option value="" selected disabled hidden>
                  Select Watch List
                </option>
                {listOfUserWatchList?.map((watchlist, id) => {
                  return (
                    <option value={watchlist?.id} key={id}>
                      {watchlist?.name}
                    </option>
                  );
                })}
              </select>
              <div className="add-cancel-btn-watchlist-container">
                <button className="add-cancel-btn-watchlist">Add Stock</button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="add-cancel-btn-watchlist"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddStockToWatchListModal;
