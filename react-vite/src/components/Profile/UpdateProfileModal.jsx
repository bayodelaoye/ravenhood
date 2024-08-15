import { useModal } from "../../context/Modal";
import { Form } from "react-router-dom";
import { useState } from "react";
// import { useSelector } from "react-redux";
import "./UpdateProfile.css";

const UpdateProfileModal = ({ userPortfolios, navigate }) => {
	const { closeModal } = useModal();
	// const currentUser = useSelector((state) => state.session.user);
	const [username, setUsername] = useState(userPortfolios.username);
	// const userToUpdate = userPortfolios
	// 	? userPortfolios.id === currentUser.id
	// 	: null;

	// useEffect(() => {
	// 	if (userToUpdate) {
	// 		setUsername(userToUpdate.username || "");
	// 	}
	// }, [userToUpdate]);

	// const update = async (event) => {
	// 	event.preventDefault();
	// 	const response = await fetch(`/api/users/${userPortfolios.id}`, {
      //             method: "PUT",
                  
	// 	});
	// };

	const close = async (event) => {
		event.preventDefault();
		closeModal();
	};

	return (
		<div id="update-user-modal">
			<div>
				<h2>Edit Profile</h2>
				<button className="closeButton" onClick={close}>
					X
				</button>
			</div>
			<Form
				method="put"
				encType="multipart/form-data"
				type="file"
				action={`/profile/portfolios`}
				onSubmit={close}
			>
				<div id="image-update" className="user-image-update">
					<img src={userPortfolios?.image} />
					<input name="image" type="file" accept="image/*" />
				</div>
				<div id="username-update">
					<h4>Username</h4>
					<input
						type="text"
						name="username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<input type="hidden" name="id" value={userPortfolios.id} />
				</div>
				<button type="submit" name="intent" value="update-profile-pic" id="users-update-button">Save Changes</button>
			</Form>
		</div>
	);
};

export default UpdateProfileModal;
