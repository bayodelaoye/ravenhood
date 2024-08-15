import { useLoaderData, useActionData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import UpdateProfileModal from "./UpdateProfileModal";
import "./Profile.css";

const Profile = () => {
	const { userPortfolios } = useLoaderData();
	const userUpdatePic = useActionData();
	const currentUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();
	const date = new Date(userPortfolios.created_at);
	const year = date.getFullYear();

	console.log("portfolio", userPortfolios);
	console.log("userUpdatePic", userUpdatePic);

	return (
            <div id="user-profile-portfolio">
                  {currentUser }
			<div id="user-profile-details">
				<div id="user-profile-pic" className="user-image-update">
					<img src={userPortfolios.image} alt="" />
				</div>
				<div>
					<h2>
						{userPortfolios.first_name} {userPortfolios.last_name}
					</h2>
					<p>
						@{userPortfolios.username} • Joined {year}
					</p>
					<OpenModalButton
						buttonText={`Edit Profile`}
						style={{
							cursor: `pointer`,
							textDecoration: `underline`,
							fontWeight: `bold`,
							border: `none`,
						}}
						userPortfolios={userPortfolios}
						navigate={navigate}
						modalComponent={
							<UpdateProfileModal
								userPortfolios={userPortfolios}
								navigate={navigate}
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default Profile;
