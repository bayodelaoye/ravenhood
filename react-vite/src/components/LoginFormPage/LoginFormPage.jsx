import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import LoginFormPageDemoLink from "./LoginFormPageDemoLink";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      {/* {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)} */}
      <div className="login-background">
        <img src='https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/9435691b466061dc75b0.jpg' alt="Log-in background" />
      </div>
      <div className="login-details">
        <div className="empty"></div>
        <div className="login-form">
          <h1>Log in to Ravenhood</h1>
          <form onSubmit={handleSubmit}>
            <div className="email-box">
              <label>
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="password-box">
              <label>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="buttons">
              <button disabled={email === "" || password === "" ? true : false} className="login-button" type="submit">Log In</button>
              <LoginFormPageDemoLink />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
  // 		<form onSubmit={handleSubmit}>
  // 			<label>
  // 				Email
  // 				<input
  // 					type="text"
  // 					value={email}
  // 					onChange={(e) => setEmail(e.target.value)}
  // 					required
  // 				/>
  // 			</label>
  // 			{errors.email && <p>{errors.email}</p>}
  // 			<label>
  // 				Password
  // 				<input
  // 					type="password"
  // 					value={password}
  // 					onChange={(e) => setPassword(e.target.value)}
  // 					required
  // 				/>
  // 			</label>
  // 			{errors.password && <p>{errors.password}</p>}
  // 			<button type="submit">Log In</button>
  // 		</form>
  // 	</>
  // );
}

export default LoginFormPage;
