import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Profile from "./Profile";
import OpenModalButton from "../OpenModalButton";
import UpdateProfileModal from "./UpdateProfileModal";

const UserProfilePage = () => {
	const { userPortfolios } = useLoaderData();
	const [image, setImage] = useState(userPortfolios.image);
	const handleImageChange = (newImage) => {
		setImage(newImage);
	};
	return (
		<div>
			<Profile
				userPortfolios={{ ...userPortfolios, image }}
				onImageChange={handleImageChange}
			/>
			<OpenModalButton
				buttonText={`Edit Profile`}
				style={{
					cursor: `pointer`,
					textDecoration: `underline`,
					fontWeight: `bold`,
					border: `none`,
				}}
				userPortfolios={userPortfolios}
				onImageChange={handleImageChange}
				modalComponent={
					<UpdateProfileModal
						userPortfolios={userPortfolios}
						onImageChange={handleImageChange}
					/>
				}
			/>
		</div>
	);
};

export default UserProfilePage;
