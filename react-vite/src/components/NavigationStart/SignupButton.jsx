import { useNavigate } from "react-router-dom";

import "./SignupButton.css"

function ProfileButton() {

  const navigate = useNavigate()

  const handleClick = (e) =>{
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <>
      <button onClick={handleClick} id="NavigationStartButtonSignup">Sign up</button>
    </>
  );
}

export default ProfileButton;
