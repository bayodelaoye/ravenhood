import { useNavigate, Form, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaFaceGrinStars, FaRegCircleXmark } from "react-icons/fa6";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./Profile.css";

const Profile = ({ onImageChange }) => {
  const { userPortfolios: initialUserPortfolios } = useLoaderData();
  const navigate = useNavigate();
  const [userPortfolios, setUserPortfolios] = useState(initialUserPortfolios);

  const date = new Date(userPortfolios.created_at);
  const year = date.getFullYear();

  return (
    <div id="user-profile-portfolio">
      <div id="user-profile-details">
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

// import { useNavigate, Form, useActionData } from "react-router-dom";
// // import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// // import OpenModalButton from "../OpenModalButton";
// // import UpdateProfileModal from "./UpdateProfileModal";
// import { FaFaceGrinStars, FaRegCircleXmark } from "react-icons/fa6";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import "./Profile.css";

// const Profile = ({ userPortfolios: initialPortfolios, onImageChange }) => {
// 	const { userPortfolios } = useLoaderData();
// 	// const currentUser = useSelector((state) => state.session.user);
// 	const navigate = useNavigate();
// 	const [userPortfolios, setUserPortfolios] = useState(initialPortfolios);
// 	const [image, setImage] = useState(userPortfolios.image || null);
// 	const [preview, setPreview] = useState(userPortfolios.image || null);
// 	const actionData = useActionData();

// 	useEffect(() => {
// 		setImage(userPortfolios.image);
// 		setPreview(userPortfolios.image);
// 	}, [userPortfolios.image]);

// 	if (!userPortfolios) {
// 		// Optionally, handle the case where userPortfolios is not yet loaded
// 		return <div>Loading...</div>;
// 	}
// 	useEffect(() => {
// 		const fetchUserPortfolios = async () => {
// 			const response = await fetch(`/api/users/${userPortfolios.id}`);
// 			const updatedUserData = await response.json();
// 			setUserPortfolios(updatedUserData);
// 		};

// 		fetchUserPortfolios();
// 	}, []);

// 	const date = new Date(userPortfolios.created_at);
// 	const year = date.getFullYear();
// 	const handleImageChange = async (newImage) => {
// 		// Update the image state locally
// 		setImage(newImage);

// 		// Optionally refetch user data to ensure it's fully updated
// 		const updatedUser = await fetch(`/api/users/${userPortfolios.id}`);
// 		const updatedUserData = await updatedUser.json();

// 		// Update user portfolios with the latest data
// 		setUserPortfolios(updatedUserData);
// 	};

// 	const handleRemoveImage = () => {
// 		setImage(null);
// 		setPreview(null);
// 	};

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();
// 		const formData = new FormData();
// 		// formData.append("username", username);
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
// 				// closeModal();
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
// 		<div id="user-profile-portfolio">
// 			<div id="user-profile-details">
// 				<Form
// 					method="put"
// 					encType="multipart/form-data"
// 					onSubmit={handleSubmit}
// 				>
// 					<div id="image-update" className="user-image-update">
// 						{preview ? (
// 							<>
// 								<img src={preview} alt="Current Profile" width={100} />
// 								<button
// 									type="button"
// 									className="remove-image-button"
// 									onClick={handleRemoveImage}
// 									style={{
// 										background: `none`,
// 										border: `none`,
// 										cursor: `pointer`,
// 									}}
// 								>
// 									<FaRegCircleXmark size={20} />
// 								</button>
// 							</>
// 						) : (
// 							<>
// 								<FaFaceGrinStars size={100} />
// 								<button
// 									type="button"
// 									className="remove-image-button"
// 									onClick={triggerFileInput}
// 								>
// 									<AiOutlinePlusCircle size={20} />
// 								</button>
// 								<input
// 									id="file-input"
// 									name="image"
// 									type="file"
// 									accept="image/*"
// 									onChange={handleImageChange}
// 									hidden
// 								/>
// 							</>
// 						)}
// 					</div>
// 				</Form>
// 				<div>
// 					<h2>
// 						{userPortfolios.first_name} {userPortfolios.last_name}
// 					</h2>
// 					<p>
// 						@{userPortfolios.username} • Joined {year}
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Profile;
