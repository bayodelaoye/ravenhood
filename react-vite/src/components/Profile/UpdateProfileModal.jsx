import { useState, useEffect } from "react";
import { Form, useNavigate, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaFaceGrinStars, FaRegCircleXmark } from "react-icons/fa6";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./UpdateProfile.css";

const UpdateProfileModal = ({ userPortfolios, onImageChange }) => {
	const { closeModal } = useModal();
	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();
	const actionData = useActionData();
	const [username, setUsername] = useState(userPortfolios.username);
	const [image, setImage] = useState(userPortfolios.image || null);
	const [preview, setPreview] = useState(userPortfolios.image || null);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (!sessionUser) {
			navigate("/");
		}
	}, [sessionUser, navigate]);

	// Update local state when the prop changes
	useEffect(() => {
		setImage(userPortfolios.image);
		setPreview(userPortfolios.image);
	}, [userPortfolios.image]); // Depend on the prop

	useEffect(() => {
		if (actionData?.newImage) {
			onImageChange(actionData.newImage); // Update image in parent state
		}
	}, [actionData, onImageChange]);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
			onImageChange(file);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setPreview(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const errs = {};
		const formData = new FormData();
		formData.append("username", username);
		if (image) {
			formData.append("image", image); // Add the image file
		}
		if (!username.length) errs.username = "Username is required";

		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		}

		try {
			const response = await fetch(`/api/users/${userPortfolios.id}`, {
				method: "PUT",
				body: formData, // Send the form data
			});

			if (response.ok) {
				const newImageUrl = preview;
				onImageChange(newImageUrl);
				closeModal();
				navigate("/portfolios");
			} else {
				console.error("Update failed");
			}
		} catch (error) {
			console.error("Error during update:", error);
		}
	};

	const triggerFileInput = () => {
		document.getElementById("file-input").click();
	};

	return (
		<div id="update-user-modal">
			<div>
				<h2>Edit Profile</h2>
				<button className="closeButton" onClick={closeModal}>
					X
				</button>
			</div>

			<Form method="put" encType="multipart/form-data" onSubmit={handleSubmit}>
				<div id="image-update" className="user-image-update">
					{preview ? (
						<>
							<img src={preview} alt="Current Profile" width={100} />
							<button
								type="button"
								className="remove-image-button"
								onClick={handleRemoveImage}
							>
								<FaRegCircleXmark size={20} />
							</button>
						</>
					) : (
						<>
							<FaFaceGrinStars size={100} />
							<button
								type="button"
								className="remove-image-button"
								onClick={triggerFileInput}
							>
								<AiOutlinePlusCircle size={20} />
							</button>
							<input
								id="file-input"
								name="image"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								hidden
							/>
						</>
					)}
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
				{errors.username && (
					<p style={{ color: "red" }} className="errors">
						{errors.username}
					</p>
				)}
				<button
					type="submit"
					name="intent"
					value="update-profile-pic"
					id="users-update-button"
				>
					Save Changes
				</button>
			</Form>
		</div>
	);
};

export default UpdateProfileModal;

// import { useState, useEffect } from "react";
// import { Form, useNavigate, useActionData } from "react-router-dom";
// import { useModal } from "../../context/Modal";
// import { FaFaceGrinStars, FaRegCircleXmark } from "react-icons/fa6";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import "./UpdateProfile.css";

// const UpdateProfileModal = ({ userPortfolios, onImageChange }) => {
// 	const { closeModal } = useModal();
// 	const navigate = useNavigate();
// 	const [username, setUsername] = useState(userPortfolios.username);
// 	const [image, setImage] = useState(userPortfolios.image || null);
// 	const [preview, setPreview] = useState(userPortfolios.image || null);

// 	useEffect(() => {
// 		setImage(userPortfolios.image);
// 		setPreview(userPortfolios.image);
// 	}, [userPortfolios.image]);

// 	const actionData = useActionData();
// 	useEffect(() => {
// 		if (actionData?.newImage) {
// 			onImageChange(actionData.newImage); // Update image in parent state
// 		}
// 	}, [actionData, onImageChange]);

// 	const handleImageChange = (event) => {
// 		const file = event.target.files[0];
// 		if (file) {
// 			setImage(file);
// 			setPreview(URL.createObjectURL(file));
// 			onImageChange(file);
// 		}
// 	};

// 	const handleRemoveImage = () => {
// 		setImage(null);
// 		setPreview(null);
// 	};

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();
// 		const formData = new FormData();
// 		formData.append("username", username);
// 		if (image) {
// 			formData.append("image", image); // Add the image file
// 		}

// 		try {
// 			const response = await fetch(`/api/users/${userPortfolios.id}`, {
// 				method: "PUT",
// 				body: formData, // Send the form data
// 			});

// 			if (response.ok) {
// 				const newImageUrl = preview;
// 				onImageChange(newImageUrl);
// 				closeModal();
// 				navigate("/portfolios");
// 			} else {
// 				console.error("Update failed");
// 			}
// 		} catch (error) {
// 			console.error("Error during update:", error);
// 		}
// 	};

// 	const triggerFileInput = () => {
// 		document.getElementById("file-input").click();
// 	};

// 	return (
// 		<div id="update-user-modal">
// 			<div>
// 				<h2>Edit Profile</h2>
// 				<button className="closeButton" onClick={closeModal}>
// 					X
// 				</button>
// 			</div>

// 			<Form method="put" encType="multipart/form-data" onSubmit={handleSubmit}>
// 				<div id="image-update" className="user-image-update">
// 					{preview ? (
// 						<>
// 							<img src={preview} alt="Current Profile" width={100} />
// 							<button
// 								type="button"
// 								className="remove-image-button"
// 								onClick={handleRemoveImage}
// 							>
// 								<FaRegCircleXmark size={20} />
// 							</button>
// 						</>
// 					) : (
// 						<>
// 							<FaFaceGrinStars size={100} />
// 							<button
// 								type="button"
// 								className="remove-image-button"
// 								onClick={triggerFileInput}
// 							>
// 								<AiOutlinePlusCircle size={20} />
// 							</button>
// 							<input
// 								id="file-input"
// 								name="image"
// 								type="file"
// 								accept="image/*"
// 								onChange={handleImageChange}
// 								hidden
// 							/>
// 						</>
// 					)}
// 				</div>
// 				<div id="username-update">
// 					<h4>Username</h4>
// 					<input
// 						type="text"
// 						name="username"
// 						value={username}
// 						onChange={(event) => setUsername(event.target.value)}
// 					/>
// 					<input type="hidden" name="id" value={userPortfolios.id} />
// 				</div>
// 				<button
// 					type="submit"
// 					name="intent"
// 					value="update-profile-pic"
// 					id="users-update-button"
// 				>
// 					Save Changes
// 				</button>
// 			</Form>
// 		</div>
// 	);
// };

// export default UpdateProfileModal;
