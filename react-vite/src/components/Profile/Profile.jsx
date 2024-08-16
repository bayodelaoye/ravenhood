import { useNavigate, Form} from "react-router-dom";
// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import OpenModalButton from "../OpenModalButton";
// import UpdateProfileModal from "./UpdateProfileModal";
import { FaFaceGrinStars, FaRegCircleXmark } from "react-icons/fa6";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./Profile.css";

// pointless comment
const Profile = ({ userPortfolios, onImageChange }) => {
	// const { userPortfolios } = useLoaderData();
	// const currentUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();
	const date = new Date(userPortfolios.created_at);
	const year = date.getFullYear();
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
            formData.append("image", image);

		try {
			const response = await fetch(`/api/users/${userPortfolios.id}`, {
				method: "PUT",
				body: formData,
			});

			if (response.ok) {
				onImageChange(image);
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
		<div id="user-profile-portfolio">
			<div id="user-profile-details">
				<Form
					method="put"
					encType="multipart/form-data"
					onSubmit={handleSubmit}
				>
					<div id="image-update" className="user-image-update">
						{preview ? (
							<>
								<img src={userPortfolios.image} alt="Current Profile" width={100} />
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
				</Form>
				<div>
					<h2>
						{userPortfolios.first_name} {userPortfolios.last_name}
					</h2>
					<p>
						@{userPortfolios.username} • Joined {year}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
