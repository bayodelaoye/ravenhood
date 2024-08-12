const ConfirmDeleteWatchlist = ({ onDelete, onClose, message, type }) => (
    < div className="deleteBox" >
        <h2>Confirm Delete</h2>
        <p>{message}</p>
        <button className="deleteConfirm" onClick={onDelete}>Yes</button>
        <button className="deleteClose" onClick={onClose}>No</button>
    </div >
);

export default ConfirmDeleteWatchlist;
