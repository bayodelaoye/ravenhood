import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import "./LoginFormPageDemoLink.css";



function LoginFormPageDemoLink() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState({});
  const email = "demo@aa.io";
  const password = "password";

  const handleClick = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      // setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <button className="login-button" id="LoginFormPageDemoLinkButton" onClick={handleClick}>
      Demo User Login
    </button>

  )
}

export default LoginFormPageDemoLink;
