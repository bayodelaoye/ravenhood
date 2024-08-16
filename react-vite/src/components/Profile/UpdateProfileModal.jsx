import { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { FaFaceGrinStars, FaRegCircleXmark } from "react-icons/fa6";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./UpdateProfile.css";

const UpdateProfileModal = ({ userPortfolios, onImageChange }) => {
	const { closeModal } = useModal();
	const navigate = useNavigate();
	const [username, setUsername] = useState(userPortfolios.username);
	const [image, setImage] = useState(userPortfolios.image || null);
	const [preview, setPreview] = useState(userPortfolios.image || null);

	useEffect(() => {
		setImage(userPortfolios.image);
		setPreview(userPortfolios.image);
	}, [userPortfolios.image]);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setPreview(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("username", username);
		if (image) {
			formData.append("image", image);
		}

		try {
			const response = await fetch(`/api/users/${userPortfolios.id}`, {
				method: "PUT",
				body: formData,
			});

			if (response.ok) {
				onImageChange(image); // Notify parent of the image change
				closeModal();
				navigate("/profile/portfolios");
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
