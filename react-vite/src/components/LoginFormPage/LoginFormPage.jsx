import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useLoaderData } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
	const navigate = useNavigate();
      const allStocks = useLoaderData()
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
      const [errors, setErrors] = useState({});
      
      console.log("here is all stocks", allStocks);

	if (sessionUser) return <Navigate to="/" replace={true} />;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const serverResponse = await dispatch(
			thunkLogin({
				email,
				password,
			}),
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			navigate("/");
		}
	};

	return (
		<>
			<h1>Log In</h1>
			{errors.length > 0 &&
                        errors.map((message) => <p key={message}>{message}</p>)}
                  {allStocks.map((stock) => (
                        <div key={stock.id}>
                              {stock.company_name}
                              {stock.average_volume}
                        </div>
                  
                  ))}
			<form onSubmit={handleSubmit}>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors.email && <p>{errors.email}</p>}
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && <p>{errors.password}</p>}
				<button type="submit">Log In</button>
			</form>
		</>
	);
}

export default LoginFormPage;
