import { useNavigate } from "react-router-dom";
import "./LoginButton.css"

function LoginButton() {
  // const user = useSelector((store) => store.session.user);
  const navigate = useNavigate()

  const handleClick = (e) =>{
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
      <button onClick={handleClick} id="NavigationStartButtonLogin">Log in</button>
    </>
  );
}

export default LoginButton;
