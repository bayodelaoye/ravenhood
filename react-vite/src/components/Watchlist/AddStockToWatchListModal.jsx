import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userWatchLists } from "../../redux/watchlist";
import "./Watchlist.css";

const AddStockToWatchListModal = ({ onClose, stockId }) => {
  const [watchList, setwatchList] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const listOfUserWatchList = useSelector(
    (state) => state?.watchlist?.userWatchLists?.watch_lists
  );

  useEffect(() => {
    dispatch(userWatchLists())
      .then(() => setIsLoaded(true))
      .then(() => {
        const errors = {};

        if (watchList === "") errors.watchlist = "Must select a watch list";

        setFormErrors(errors);
      });
  }, [dispatch, watchList]);

  const submitAddToWatchList = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const response = await fetch(`/api/watch_lists/${watchList}/add`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock_id: stockId,
      }),
    });

    const message = await response.json();
    if (response.ok) {
      onClose();
    }
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
                onClick={(e) => setwatchList(e.target.value)}
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
